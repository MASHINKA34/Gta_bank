import { Request, Response } from 'express';
import * as atmService from '../services/atmService';

export const getBalance = async (req: Request, res: Response) => {
  const { username } = req.params;
  const balance = await atmService.getBalance(username);
  res.json({ balance });
};

export const deposit = async (req: Request, res: Response) => {
  const { username, amount } = req.body;
  const result = await atmService.deposit(username, Number(amount));
  res.json(result);
};

export const withdraw = async (req: Request, res: Response) => {
  const { username, amount } = req.body;
  const result = await atmService.withdraw(username, Number(amount));
  res.json(result);
};

export const transfer = async (req: Request, res: Response) => {
  const { from, to, amount } = req.body;
  const result = await atmService.transfer(from, to, Number(amount));
  res.json(result);
};

export const history = async (req: Request, res: Response) => {
  const { username } = req.params;
  const result = await atmService.history(username);
  res.json(result);
};
