-- Create Database
CREATE DATABASE nexus_command_center;

-- Connect to database and run the following:

-- 1. Global Projects Registry Table
CREATE TABLE IF NOT EXISTS global_projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    base_url TEXT NOT NULL,
    webhook_secret TEXT NOT NULL,
    category VARCHAR(50),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Consolidated Revenue & Ledger Table
CREATE TABLE IF NOT EXISTS master_financial_ledger (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES global_projects(project_id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    transaction_type VARCHAR(50),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. AI Threat & Anomaly Monitoring Table
CREATE TABLE IF NOT EXISTS ai_system_health_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES global_projects(project_id) ON DELETE CASCADE,
    cpu_usage_percent FLOAT,
    memory_usage_percent FLOAT,
    latency_ms INT,
    threat_level VARCHAR(20) DEFAULT 'LOW',
    ai_recommendation TEXT,
    is_auto_healed BOOLEAN DEFAULT FALSE,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
