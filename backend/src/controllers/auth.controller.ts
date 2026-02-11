import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as authService from '../services/auth.service';
import { ApiError } from '../utils/apiError';

const registerSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  fullName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

const googleSchema = z.object({
  idToken: z.string().min(1, 'Token é obrigatório'),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token é obrigatório'),
});

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, fullName } = registerSchema.parse(req.body);
    const result = await authService.register(email, password, fullName);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(ApiError.badRequest(err.errors[0].message));
    }
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(ApiError.badRequest(err.errors[0].message));
    }
    next(err);
  }
}

export async function googleLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { idToken } = googleSchema.parse(req.body);
    const result = await authService.googleLogin(idToken);
    res.json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(ApiError.badRequest(err.errors[0].message));
    }
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    const tokens = await authService.refresh(refreshToken);
    res.json(tokens);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(ApiError.badRequest(err.errors[0].message));
    }
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.logout(req.user!.userId);
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (err) {
    next(err);
  }
}
