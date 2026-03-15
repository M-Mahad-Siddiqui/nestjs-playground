
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/decorators/role.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('[AuthorizationGuard] Required roles:', requiredRoles);

        if (!requiredRoles || requiredRoles.length === 0) {
            console.log('[AuthorizationGuard] No role required. Access granted.');
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const userRole = request.user?.role;
        console.log('[AuthorizationGuard] User role from token:', userRole);

        if (!userRole || !requiredRoles.includes(userRole)) {
            console.log('[AuthorizationGuard] Access denied. Role is not allowed.');
            throw new ForbiddenException('You do not have permission to access this route');
        }

        console.log('[AuthorizationGuard] Access granted by role check.');
        return true;
    }
}