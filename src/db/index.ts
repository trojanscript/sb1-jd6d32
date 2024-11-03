import Database from 'better-sqlite3';
import { schema } from './schema';

const db = new Database('admin.db');

// Initialize database with schema
db.exec(schema);

export default db;