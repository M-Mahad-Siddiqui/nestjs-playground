import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export class CustomInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler,): Promise<Observable<any>> {
        console.log('CustomInterceptor: Before handling the request');
        return next.handle().pipe();

    }
}   