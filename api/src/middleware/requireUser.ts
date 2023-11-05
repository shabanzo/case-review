import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/appError';

export const requireUser = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user) {
      res.status(401).json({
        status: 'failed',
        data: {
          message: `Invalid token or session has expired`,
        },
      });

      return next(new AppError(401, `Invalid token or session has expired`));
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
