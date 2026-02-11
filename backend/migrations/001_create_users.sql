CREATE TABLE IF NOT EXISTS users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name     VARCHAR(255),
    role          VARCHAR(50) NOT NULL DEFAULT 'USER',
    google_id     VARCHAR(255) UNIQUE,
    refresh_token TEXT,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);
