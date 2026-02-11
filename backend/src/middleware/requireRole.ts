import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }

    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden('Você não tem permissão para acessar este recurso'));
    }

    next();
  };
}
