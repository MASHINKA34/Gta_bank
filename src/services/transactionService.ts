import pool from '../database/config';
import { Transaction } from '../models';

export class TransactionService {
  // Создать новую транзакцию
  static async create(
    playerId: number,
    type: 'deposit' | 'withdraw' | 'transfer_in' | 'transfer_out',
    amount: number,
    targetSteamId?: string,
    description?: string
  ): Promise<Transaction> {
    const query = `
      INSERT INTO transactions (player_id, type, amount, target_steam_id, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [
      playerId,
      type,
      amount,
      targetSteamId || null,
      description || null
    ]);
    
    return result.rows[0];
  }

  // Получить историю транзакций игрока
  static async getHistory(steamId: string, limit: number = 15): Promise<Transaction[]> {
    const query = `
      SELECT t.* FROM transactions t
      JOIN players p ON t.player_id = p.id
      WHERE p.steam_id = $1
      ORDER BY t.created_at DESC
      LIMIT $2
    `;
    const result = await pool.query(query, [steamId, limit]);
    
    return result.rows;
  }

  // Получить последние транзакции для отладки
  static async getRecentTransactions(limit: number = 10): Promise<Transaction[]> {
    const query = `
      SELECT t.*, p.steam_id 
      FROM transactions t
      JOIN players p ON t.player_id = p.id
      ORDER BY t.created_at DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    
    return result.rows;
  }
}