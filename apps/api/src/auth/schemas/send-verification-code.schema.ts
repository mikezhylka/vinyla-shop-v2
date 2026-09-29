import { z } from 'zod';

export const SendVerificationCodeSchema = z.object({
  //   code: z.string().min(6),
  email: z.email(),
  name: z.string().min(1),
});

export type SendVerificationCode = z.infer<typeof SendVerificationCodeSchema>;
