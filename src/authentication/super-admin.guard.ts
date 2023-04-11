import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Role } from './../users/role'
import { UsersService } from './../users/users.service'

//Used with JWT guard to allow only admin access to endpoint.
@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userId: number = request.user.id

    const user = await this.usersService.findUserById(userId);

    // console.log("user in super-admin guard", user);

    return user && user.role === Role.SuperAdmin
  }
}
