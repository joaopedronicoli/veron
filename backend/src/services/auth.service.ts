import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { pool } from '../config/db';
import { env } from '../config/env';
import { signAccessToken, signRefreshToken, verifyRefreshToken, TokenPayload } from '../utils/jwt';
import { ApiError } from '../utils/apiError';

const googleClient = env.GOOGLE_CLIENT_ID ? new OAuth2Client(env.GOOGLE_CLIENT_ID) : null;

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

function generateTokens(user: { id: string; email: string; role: string }): AuthTokens {
  const payload: TokenPayload = { userId: user.id, email: user.email, role: user.role };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
}

export async function register(email: string, password: string, fullName?: string) {
  const { rows: existing } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.length > 0) {
    throw ApiError.conflict('E-mail já cadastrado');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const { rows } = await pool.query(
    `INSERT INTO users (email, password_hash, full_name)
     VALUES ($1, $2, $3)
     RETURNING id, email, role, full_name`,
    [email, passwordHash, fullName || null],
  );

  const user = rows[0];
  const tokens = generateTokens(user);

  await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [tokens.refreshToken, user.id]);

  return { user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name }, ...tokens };
}

export async function login(email: string, password: string) {
  const { rows } = await pool.query(
    'SELECT id, email, password_hash, role, full_name FROM users WHERE email = $1',
    [email],
  );

  if (rows.length === 0) {
    throw ApiError.unauthorized('E-mail ou senha incorretos');
  }

  const user = rows[0];

  if (!user.password_hash) {
    throw ApiError.unauthorized('Esta conta usa login via Google. Use o botão "Entrar com Google".');
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw ApiError.unauthorized('E-mail ou senha incorretos');
  }

  const tokens = generateTokens(user);
  await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [tokens.refreshToken, user.id]);

  return { user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name }, ...tokens };
}

export async function googleLogin(idToken: string) {
  if (!googleClient) {
    throw ApiError.badRequest('Login com Google não está configurado');
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.email) {
    throw ApiError.unauthorized('Token Google inválido');
  }

  const { email, sub: googleId, name } = payload;

  // Check if user exists by google_id or email
  const { rows: existing } = await pool.query(
    'SELECT id, email, role, full_name, google_id FROM users WHERE google_id = $1 OR email = $2',
    [googleId, email],
  );

  let user;

  if (existing.length > 0) {
    user = existing[0];
    // Link google_id if not already linked
    if (!user.google_id) {
      await pool.query('UPDATE users SET google_id = $1, updated_at = NOW() WHERE id = $2', [googleId, user.id]);
    }
  } else {
    const { rows } = await pool.query(
      `INSERT INTO users (email, full_name, google_id)
       VALUES ($1, $2, $3)
       RETURNING id, email, role, full_name`,
      [email, name || null, googleId],
    );
    user = rows[0];
  }

  const tokens = generateTokens(user);
  await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [tokens.refreshToken, user.id]);

  return { user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name }, ...tokens };
}

export async function refresh(refreshToken: string) {
  let payload: TokenPayload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized('Refresh token inválido');
  }

  const { rows } = await pool.query(
    'SELECT id, email, role, refresh_token FROM users WHERE id = $1',
    [payload.userId],
  );

  if (rows.length === 0 || rows[0].refresh_token !== refreshToken) {
    throw ApiError.unauthorized('Refresh token inválido');
  }

  const user = rows[0];
  const tokens = generateTokens(user);
  await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [tokens.refreshToken, user.id]);

  return tokens;
}

export async function logout(userId: string) {
  await pool.query('UPDATE users SET refresh_token = NULL WHERE id = $1', [userId]);
}
