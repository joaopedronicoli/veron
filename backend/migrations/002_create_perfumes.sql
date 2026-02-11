CREATE TABLE IF NOT EXISTS perfumes (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome             VARCHAR(255) NOT NULL,
    slug             VARCHAR(255) UNIQUE NOT NULL,
    essencia         VARCHAR(50) NOT NULL,
    descricao_curta  TEXT,
    imagem_principal TEXT,
    preco            DECIMAL(10,2) NOT NULL,
    marca            VARCHAR(255),
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);
