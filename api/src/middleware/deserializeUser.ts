import { NextFunction, Request, Response } from 'express';

import userService from '../app/user/user.service';
import AppError from '../utils/appError';
import { verifyJwt } from '../utils/jwt';
import redisClient from '../utils/redis';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token
    let accessToken;
    const errorCode = 401;

    if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;
    }

    if (!accessToken) {
      res.status(errorCode).json({
        status: 'failed',
        data: {
          message: `You are not logged in`,
        },
      });

      return next(new AppError(errorCode, `You are not logged in`));
    }

    // Validate Access Token
    const decoded = verifyJwt<{ sub: string }>(accessToken);

    if (!decoded) {
      res.status(errorCode).json({
        status: 'failed',
        data: {
          message: `Invalid token or user doesn't exist`,
        },
      });

      return next(
        new AppError(errorCode, `Invalid token or user doesn't exist`)
      );
    }

    // Check if user has a valid session
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      res.status(errorCode).json({
        status: 'failed',
        data: {
          message: `User session has expired`,
        },
      });
      return next(new AppError(errorCode, `User session has expired`));
    }

    // Check if user still exist
    const user = await userService.findUserById(JSON.parse(session)._id);

    if (!user) {
      res.status(errorCode).json({
        status: 'failed',
        data: {
          message: `User with that token no longer exist`,
        },
      });

      return next(
        new AppError(errorCode, `User with that token no longer exist`)
      );
    }

    res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
};
