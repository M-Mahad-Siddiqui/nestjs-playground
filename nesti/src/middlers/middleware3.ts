import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class Middleware3 implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('middleware3');
        next();
    }
}