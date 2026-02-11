import { pool } from '../config/db';
import { ApiError } from '../utils/apiError';

export interface PerfumeInput {
  nome: string;
  slug: string;
  essencia: string;
  descricao_curta?: string;
  imagem_principal?: string;
  preco: number;
  marca?: string;
}

export async function listPerfumes(filters: { search?: string; essencia?: string; marca?: string }) {
  const conditions: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (filters.essencia) {
    conditions.push(`essencia = $${paramIndex++}`);
    params.push(filters.essencia);
  }

  if (filters.marca) {
    conditions.push(`marca ILIKE $${paramIndex++}`);
    params.push(`%${filters.marca}%`);
  }

  if (filters.search) {
    conditions.push(`(nome ILIKE $${paramIndex} OR marca ILIKE $${paramIndex} OR descricao_curta ILIKE $${paramIndex})`);
    params.push(`%${filters.search}%`);
    paramIndex++;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const { rows } = await pool.query(
    `SELECT * FROM perfumes ${where} ORDER BY created_at DESC`,
    params,
  );

  return rows;
}

export async function getPerfumeBySlug(slug: string) {
  const { rows } = await pool.query('SELECT * FROM perfumes WHERE slug = $1', [slug]);

  if (rows.length === 0) {
    throw ApiError.notFound('Perfume não encontrado');
  }

  return rows[0];
}

export async function createPerfume(input: PerfumeInput) {
  const { rows: existing } = await pool.query('SELECT id FROM perfumes WHERE slug = $1', [input.slug]);
  if (existing.length > 0) {
    throw ApiError.conflict('Já existe um perfume com este slug');
  }

  const { rows } = await pool.query(
    `INSERT INTO perfumes (nome, slug, essencia, descricao_curta, imagem_principal, preco, marca)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [input.nome, input.slug, input.essencia, input.descricao_curta || null, input.imagem_principal || null, input.preco, input.marca || null],
  );

  return rows[0];
}

export async function updatePerfume(id: string, input: Partial<PerfumeInput>) {
  const fields: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      fields.push(`${key} = $${paramIndex++}`);
      params.push(value);
    }
  }

  if (fields.length === 0) {
    throw ApiError.badRequest('Nenhum campo para atualizar');
  }

  fields.push(`updated_at = NOW()`);
  params.push(id);

  const { rows } = await pool.query(
    `UPDATE perfumes SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    params,
  );

  if (rows.length === 0) {
    throw ApiError.notFound('Perfume não encontrado');
  }

  return rows[0];
}

export async function deletePerfume(id: string) {
  const { rowCount } = await pool.query('DELETE FROM perfumes WHERE id = $1', [id]);

  if (rowCount === 0) {
    throw ApiError.notFound('Perfume não encontrado');
  }
}
