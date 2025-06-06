import { Pool } from 'pg';
import { dbConfig } from '../database/config';

const pool = new Pool(dbConfig);

export async function getBalance(username: string): Promise<number> {
  const res = await pool.query('SELECT balance FROM players WHERE username = $1', [username]);
  return res.rows[0]?.balance || 0;
}

export async function deposit(username: string, amount: number) {
  await pool.query('INSERT INTO players (username, balance) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET balance = players.balance + $2', [username, amount]);
  await pool.query('INSERT INTO transactions (from_username, to_username, amount, type) VALUES ($1, $1, $2, $3)', [username, amount, 'deposit']);
  return { status: 'ok', message: 'Баланс пополнен' };
}

export async function withdraw(username: string, amount: number) {
  const res = await pool.query('SELECT balance FROM players WHERE username = $1', [username]);
  if (!res.rows[0] || res.rows[0].balance < amount) {
    return { status: 'fail', message: 'Недостаточно средств' };
  }
  await pool.query('UPDATE players SET balance = balance - $1 WHERE username = $2', [amount, username]);
  await pool.query('INSERT INTO transactions (from_username, to_username, amount, type) VALUES ($1, $1, $2, $3)', [username, amount, 'withdraw']);
  return { status: 'ok', message: 'Деньги сняты' };
}

export async function transfer(from: string, to: string, amount: number) {
  const res = await pool.query('SELECT balance FROM players WHERE username = $1', [from]);
  if (!res.rows[0] || res.rows[0].balance < amount) {
    return { status: 'fail', message: 'Недостаточно средств для перевода' };
  }
  await pool.query('UPDATE players SET balance = balance - $1 WHERE username = $2', [amount, from]);
  await pool.query('INSERT INTO players (username, balance) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET balance = players.balance + $2', [to, amount]);
  await pool.query('INSERT INTO transactions (from_username, to_username, amount, type) VALUES ($1, $2, $3, $4)', [from, to, amount, 'transfer']);
  return { status: 'ok', message: 'Перевод выполнен' };
}

export async function history(username: string) {
  const res = await pool.query(
    'SELECT * FROM transactions WHERE from_username = $1 OR to_username = $1 ORDER BY created_at DESC LIMIT 30',
    [username]
  );
  return res.rows;
}
