import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserWithProfile } from '@src/users/types/User';

interface RequestWithUser extends Request {
  user: UserWithProfile;
}

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    return request.user;
  },
);
