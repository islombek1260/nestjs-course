import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../dto/create.user.dto';

@Injectable()
export class SignInGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: CreateUserDto = request.body;

    if (!user || !user.username || !user.password) {
      return false;
    }

    return true;
  }
}