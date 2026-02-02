import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'database.db');
const db = new Database(dbPath);

console.log('🔍 Verificando estrutura do banco...\n');

// Ver schema da tabela respostas
const schema = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='respostas_due_diligence'").get();
console.log('📋 Schema da tabela respostas_due_diligence:');
console.log(schema.sql);
console.log('\n');

// Ver foreign keys
const fks = db.prepare("PRAGMA foreign_key_list('respostas_due_diligence')").all();
console.log('🔗 Foreign keys da tabela respostas_due_diligence:');
console.log(fks);

db.close();
