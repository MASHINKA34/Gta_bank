import { Pool } from 'pg';
import { dbConfig } from './config';

const pool = new Pool(dbConfig);

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS players (
      username VARCHAR(32) PRIMARY KEY,
      balance NUMERIC(20,2) NOT NULL DEFAULT 0
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      from_username VARCHAR(32),
      to_username VARCHAR(32),
      amount NUMERIC(20,2) NOT NULL,
      type VARCHAR(16) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('Миграция прошла успешно');
  await pool.end();
};

createTables().catch(e => {
  console.error('Ошибка миграции:', e);
  pool.end();
});
