const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Perfume {
  id: string;
  nome: string;
  slug: string;
  essencia: 'feminino' | 'masculino' | 'kits-presentes';
  descricao_curta: string;
  imagem_principal: string;
  preco: number;
  marca: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: 'ADMIN' | 'USER';
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      clearTokens();
      return null;
    }

    const data = await res.json();
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch {
    clearTokens();
    return null;
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  const token = getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  // If 401 and we have a refresh token, try to refresh
  if (res.status === 401 && getRefreshToken()) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Erro de rede' }));
    throw new Error(body.error || `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// Auth
export const api = {
  auth: {
    register(email: string, password: string, fullName?: string) {
      return apiFetch<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, fullName }),
      });
    },
    login(email: string, password: string) {
      return apiFetch<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },
    google(idToken: string) {
      return apiFetch<AuthResponse>('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
      });
    },
    logout() {
      return apiFetch<void>('/auth/logout', { method: 'POST' });
    },
  },
  users: {
    me() {
      return apiFetch<User>('/users/me');
    },
  },
  perfumes: {
    list(params?: { search?: string; essencia?: string; marca?: string }) {
      const searchParams = new URLSearchParams();
      if (params?.search) searchParams.set('search', params.search);
      if (params?.essencia) searchParams.set('essencia', params.essencia);
      if (params?.marca) searchParams.set('marca', params.marca);
      const qs = searchParams.toString();
      return apiFetch<Perfume[]>(`/perfumes${qs ? `?${qs}` : ''}`);
    },
    getBySlug(slug: string) {
      return apiFetch<Perfume>(`/perfumes/${slug}`);
    },
    create(data: Omit<Perfume, 'id' | 'created_at' | 'updated_at'>) {
      return apiFetch<Perfume>('/perfumes', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    update(id: string, data: Partial<Perfume>) {
      return apiFetch<Perfume>(`/perfumes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    delete(id: string) {
      return apiFetch<void>(`/perfumes/${id}`, { method: 'DELETE' });
    },
  },
};
