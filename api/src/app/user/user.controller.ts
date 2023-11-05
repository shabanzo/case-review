import express, { NextFunction, Request, Response } from 'express';

import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../middleware/requireUser';
import userService from './user.service';

const router = express.Router();

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.findAllUsers();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: users,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getMyProfile = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err: any) {
    next(err);
  }
};

router.use(deserializeUser, requireUser);
router.get('/', getAllUsers);
router.get('/me', getMyProfile);

export default router;
