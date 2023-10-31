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
    if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;
    }

    if (!accessToken) {
      return next(new AppError(401, 'You are not logged in'));
    }

    // Validate Access Token
    const decoded = verifyJwt<{ sub: string }>(accessToken);

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    // Check if user has a valid session
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(401, `User session has expired`));
    }

    // Check if user still exist
    const user = await userService.findUserById(JSON.parse(session)._id);

    if (!user) {
      return next(new AppError(401, `User with that token no longer exist`));
    }

    res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
};
