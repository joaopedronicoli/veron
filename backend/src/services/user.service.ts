import { pool } from '../config/db';
import { ApiError } from '../utils/apiError';

export async function getUserById(id: string) {
  const { rows } = await pool.query(
    'SELECT id, email, full_name, role, created_at FROM users WHERE id = $1',
    [id],
  );

  if (rows.length === 0) {
    throw ApiError.notFound('Usuário não encontrado');
  }

  return rows[0];
}
