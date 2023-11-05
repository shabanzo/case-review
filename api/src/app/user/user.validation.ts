import { object, string, TypeOf } from 'zod';

export const createUserValidation = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'Password is required' })
      .min(6, 'Password must be more than 6 characters')
      .max(40, 'Password must be less than 40 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const loginUserValidation = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email or password'
    ),
    password: string({ required_error: 'Password is required' }).min(
      6,
      'Invalid email or password'
    ),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserValidation>['body'];
export type LoginUserInput = TypeOf<typeof loginUserValidation>['body'];
