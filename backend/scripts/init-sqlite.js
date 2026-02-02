import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'database.db');

// Remover se já existir para começar do zero
if (fs.existsSync(dbPath)) {
    // fs.unlinkSync(dbPath); // Opcional: remover se quiser reset total
}

const db = new Database(dbPath, { verbose: console.log });

console.log('🚀 Inicializando SQLite local...');

// Criar tabelas adaptadas para SQLite
db.exec(`
CREATE TABLE IF NOT EXISTS operadores (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nome_empresa TEXT NOT NULL,
    status TEXT DEFAULT 'ativo',
    is_admin BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS respostas_due_diligence (
    id TEXT PRIMARY KEY,
    operador_id TEXT NOT NULL REFERENCES operadores(id) ON DELETE CASCADE,
    secao_1_governanca TEXT DEFAULT '{}',
    secao_2_seguranca TEXT DEFAULT '{}',
    secao_3_ciclo_vida TEXT DEFAULT '{}',
    secao_4_incidentes TEXT DEFAULT '{}',
    secao_5_apostas TEXT DEFAULT '{}',
    secao_6_desenvolvimento TEXT DEFAULT '{}',
    secao_7_rh TEXT DEFAULT '{}',
    secao_8_monitoramento TEXT DEFAULT '{}',
    secao_9_integridade TEXT DEFAULT '{}',
    secao_10_terminacao TEXT DEFAULT '{}',
    arquivos_urls TEXT DEFAULT '[]',
    status_submissao TEXT DEFAULT 'rascunho',
    data_envio DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(operador_id)
);

CREATE TABLE IF NOT EXISTS arquivos_anexos (
    id TEXT PRIMARY KEY,
    resposta_id TEXT NOT NULL REFERENCES respostas_due_diligence(id) ON DELETE CASCADE,
    nome_original TEXT NOT NULL,
    nome_arquivo TEXT NOT NULL,
    tipo_arquivo TEXT,
    tamanho_bytes INTEGER,
    categoria TEXT,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

console.log('✅ Tabelas criadas no SQLite!');

db.close();
