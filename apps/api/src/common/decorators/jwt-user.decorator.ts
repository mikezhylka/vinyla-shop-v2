import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface JwtUser {
  userId: number;
  username: string;
  profileId: number;
}

interface RequestWithUser extends Request {
  user: JwtUser;
}

interface RequestWithUser extends Request {
  user: JwtUser;
}

export const JwtUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    return request.user;
  },
);
