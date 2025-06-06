export interface Player {
  id: number;
  steam_id: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface Transaction {
  id: number;
  player_id: number;
  type: 'deposit' | 'withdraw' | 'transfer_in' | 'transfer_out';
  amount: number;
  target_steam_id?: string;
  description?: string;
  created_at: Date;
}

export interface JsonRpcRequest {
  method: string;
  params: any;
  id: number | string;
}

export interface JsonRpcResponse {
  result?: any;
  error?: {
    code: number;
    message: string;
  };
  id: number | string;
}

export interface DepositParams {
  steamId: string;
  amount: number;
}

export interface WithdrawParams {
  steamId: string;
  amount: number;
}

export interface TransferParams {
  fromSteamId: string;
  toSteamId: string;
  amount: number;
}

export interface GetBalanceParams {
  steamId: string;
}

export interface GetHistoryParams {
  steamId: string;
  limit?: number;
}