import { NextFunction } from "express";

export const middleware2 = (req: Request, res: Response, next: NextFunction) => {
  console.log('middleware2');
  next();
}