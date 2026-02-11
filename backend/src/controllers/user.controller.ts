import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getUserById(req.user!.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
