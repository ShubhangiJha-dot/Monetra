CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
    icon VARCHAR(50),
    color VARCHAR(7),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, name, type)
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    -- agar cat dlt hui toh trasaction stil rahegi just null
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
    description VARCHAR(255),
    notes TEXT,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index = “Table of contents”
-- Instead of reading the whole book (table), PostgreSQL jumps to the exact page.
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date DESC);
-- this directly optimized queries like:
-- SELECT * 
-- FROM transactions
-- WHERE user_id = 5
-- ORDER BY transaction_date DESC;
CREATE INDEX idx_transactions_category ON transactions(category_id);
-- and:
-- SELECT * 
-- FROM transactions
-- WHERE category_id = 10;

CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    period VARCHAR(10) NOT NULL DEFAULT 'monthly' CHECK (period IN ('monthly', 'yearly')),
    start_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- only one budget per category per period (monthly/yearly) per user
    UNIQUE(user_id, category_id, period)
);

CREATE TABLE ai_insights (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    insight_type VARCHAR(50) NOT NULL,
    period_start DATE,
    period_end DATE,
    content_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_insights_user_created ON ai_insights(user_id, created_at DESC);