import { NextFunction } from "express";

export default(req: Request, res: Response, next: NextFunction) => {
  console.log('middleware1');
  next();
}