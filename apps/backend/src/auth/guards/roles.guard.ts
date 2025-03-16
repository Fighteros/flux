import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

type AuthResponse = {
  userId: string;
  email: string;
  role: Role;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // the request will have the role attached
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthResponse;

    if (!user) throw new UnauthorizedException();

    return requiredRoles.some((role) => user.role.toLowerCase() === role.toLowerCase());
  }
}
