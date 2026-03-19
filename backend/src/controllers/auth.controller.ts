import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import type { UserCreate } from "../types";

export const register = async (
  req: Request<{}, {}, UserCreate>,
  res: Response
): Promise<Response> => {
  const { user, token } = await authService.register(req.body);
  return res.status(201).json({ user, token });
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  return res.status(200).json({ user, token });
};
