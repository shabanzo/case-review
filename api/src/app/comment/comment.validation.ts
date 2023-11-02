import { z } from 'zod';

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createCommentValidation = z.object({
  body: z.object({
    message: z.string().min(1),
    time: z.date(),
    commenter: z
      .string({ required_error: 'Authority is required' })
      .refine((id) => ObjectIdRegex.test(id), {
        message: 'Invalid ObjectId',
      }),
    case: z
      .string({ required_error: 'Authority is required' })
      .refine((id) => ObjectIdRegex.test(id), {
        message: 'Invalid ObjectId',
      }),
  }),
});

export const updateCommentValidation = z.object({
  body: z.object({
    message: z.string().min(5),
  }),
});

export type CreateCommentInput = z.TypeOf<
  typeof createCommentValidation
>['body'];

export type UpdateCommentInput = z.TypeOf<
  typeof updateCommentValidation
>['body'];
