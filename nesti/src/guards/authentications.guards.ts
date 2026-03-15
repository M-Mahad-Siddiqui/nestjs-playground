import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


const SECRET_KEY = 'THIS IS MY SECRET KEY';
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    console.log('[AuthenticationGuard] Checking token...');

    if (!token) {
      console.log('[AuthenticationGuard] No token found');
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: SECRET_KEY });
      request.user = decoded;
      console.log('[AuthenticationGuard] Token is valid. User attached to request.');
      return true;
    } catch {
      console.log('[AuthenticationGuard] Token is invalid or expired');
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
} 