import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class authenticationsGuards implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>    {  
        const request = context.switchToHttp().getRequest();
        console.log(request.headers);     
        console.log("------------> authenticationsGuards");
        return true;
    }
}