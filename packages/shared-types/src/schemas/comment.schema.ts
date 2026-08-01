import { z } from "zod";

export const CreateCommentDto = z.object({
  rate: z.number().min(1, "Minimum rating is 1").max(5, "Maximum rating is 5"),

  description: z.string().optional(),
});

export const ReplyCommentDto = z.object({
  parentId: z.number(),
  description: z.string().min(1, "Your reply should not be empty"),
});

export type CreateCommentDto = z.infer<typeof CreateCommentDto>;
export type ReplyCommentDto = z.infer<typeof ReplyCommentDto>;
