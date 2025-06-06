import pool from '../database/config';
import { Player } from '../models';

export class PlayerService {
  // Найти игрока по Steam ID
  static async findBySteamId(steamId: string): Promise<Player | null> {
    const query = 'SELECT * FROM players WHERE steam_id = $1';
    const result = await pool.query(query, [steamId]);
    
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  // Создать нового игрока
  static async create(steamId: string): Promise<Player> {
    const query = `
      INSERT INTO players (steam_id, balance) 
      VALUES ($1, 0.00) 
      RETURNING *
    `;
    const result = await pool.query(query, [steamId]);
    
    return result.rows[0];
  }

  // Получить или создать игрока
  static async getOrCreate(steamId: string): Promise<Player> {
    let player = await this.findBySteamId(steamId);
    
    if (!player) {
      player = await this.create(steamId);
    }
    
    return player;
  }

  // Обновить баланс игрока
  static async updateBalance(steamId: string, newBalance: number): Promise<Player> {
    const query = `
      UPDATE players 
      SET balance = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE steam_id = $2 
      RETURNING *
    `;
    const result = await pool.query(query, [newBalance, steamId]);
    
    if (result.rows.length === 0) {
      throw new Error('Player not found');
    }
    
    return result.rows[0];
  }

  // Получить баланс игрока
  static async getBalance(steamId: string): Promise<number> {
    const player = await this.getOrCreate(steamId);
    return parseFloat(player.balance.toString());
  }
}