import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/appError';

export const restrictTo =
  (...allowedRoles: string[]) =>
  (_req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
      res.status(404).json({
        status: 'failed',
        data: {
          message: `${allowedRoles.join(', ')} only`,
        },
      });

      return next(
        new AppError(403, 'You are not allowed to perform this action')
      );
    }

    next();
  };
