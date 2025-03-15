import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    return true;
  }
}
