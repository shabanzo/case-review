import { z } from 'zod';

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createCaseReviewValidation = z.object({
  body: z.object({
    imageUrl: z.string({ required_error: 'ImageUrl is required' }),
    alert: z.string({ required_error: 'Alert is required' }),
    priority: z.enum(['high', 'mid', 'low']),
    description: z.string({ required_error: 'Description is required' }),
    time: z
      .string({ required_error: 'Date is required' })
      .transform((str) => new Date(str)),
    zone: z.string({ required_error: 'Zone is required' }),
    camera: z.string({ required_error: 'Camera is required' }),
    team: z.string({ required_error: 'Team is required' }),
    status: z.enum(['submitted', 'inReview', 'completed']),
    authority: z
      .string({ required_error: 'Authority is required' })
      .refine((id) => ObjectIdRegex.test(id), {
        message: 'Invalid ObjectId',
      }),
  }),
});

export const updateCaseReviewValidation = z.object({
  body: z.object({
    status: z.enum(['submitted', 'inReview', 'completed']),
    assigned: z
      .string({ required_error: 'Assigned is required' })
      .refine((id) => ObjectIdRegex.test(id), {
        message: 'Invalid ObjectId',
      }),
  }),
});

export type CreateCaseReviewInput = z.TypeOf<
  typeof createCaseReviewValidation
>['body'];

export type UpdateCaseReviewInput = z.TypeOf<
  typeof updateCaseReviewValidation
>['body'];
