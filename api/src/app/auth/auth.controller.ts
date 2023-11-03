import config from 'config';
import express, {
  CookieOptions,
  NextFunction,
  Request,
  Response,
} from 'express';

import { validate } from '../../middleware/validate';
import userService from '../user/user.service';
import {
  CreateUserInput,
  createUserValidation,
  LoginUserInput,
  loginUserValidation,
} from '../user/user.validation';

const router = express.Router();

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

const register = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(err);
  }
};

const login = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = await userService.signToken(
      req.body.email,
      req.body.password
    );

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('loggedIn', true, accessTokenCookieOptions);

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};

const logout = async (
  _req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie('accessToken', '');
    res.cookie('loggedIn', false);

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};

router.post('/register', validate(createUserValidation), register);
router.post('/login', validate(loginUserValidation), login);
router.post('/logout', logout);

export default router;
