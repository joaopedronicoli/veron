import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as perfumeService from '../services/perfume.service';
import { ApiError } from '../utils/apiError';

const createPerfumeSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  essencia: z.string().min(1, 'Essência é obrigatória'),
  descricao_curta: z.string().optional(),
  imagem_principal: z.string().optional(),
  preco: z.number().positive('Preço deve ser positivo'),
  marca: z.string().optional(),
});

const updatePerfumeSchema = createPerfumeSchema.partial();

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { search, essencia, marca } = req.query;
    const perfumes = await perfumeService.listPerfumes({
      search: search as string | undefined,
      essencia: essencia as string | undefined,
      marca: marca as string | undefined,
    });
    res.json(perfumes);
  } catch (err) {
    next(err);
  }
}

export async function getBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const perfume = await perfumeService.getPerfumeBySlug(String(req.params.slug));
    res.json(perfume);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createPerfumeSchema.parse(req.body);
    const perfume = await perfumeService.createPerfume(input);
    res.status(201).json(perfume);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(ApiError.badRequest(err.errors[0].message));
    }
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updatePerfumeSchema.parse(req.body);
    const perfume = await perfumeService.updatePerfume(String(req.params.id), input);
    res.json(perfume);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(ApiError.badRequest(err.errors[0].message));
    }
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await perfumeService.deletePerfume(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
