import { Profile, User } from '@generated/prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

export type UserWithProfile = User & { profile: Profile };
