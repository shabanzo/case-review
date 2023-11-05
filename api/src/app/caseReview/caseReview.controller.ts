import express, { NextFunction, Request, Response } from 'express';

import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../middleware/requireUser';
import { restrictTo } from '../../middleware/restrictTo';
import { validate } from '../../middleware/validate';
import caseReviewRep from './caseReview.service';
import {
  CreateCaseReviewInput,
  createCaseReviewValidation,
  UpdateCaseReviewInput,
} from './caseReview.validation';

const router = express.Router();

const createCaseReview = async (
  req: Request<{}, {}, CreateCaseReviewInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const createCaseReview = await caseReviewRep.createCaseReview(req.body);

    res.status(201).json({
      status: 'success',
      data: createCaseReview,
    });
  } catch (error: any) {
    res.status(error.status).json({
      status: 'failed',
      message: error.message,
    });
    next(error);
  }
};

const getCaseReviews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const caseReviews = await caseReviewRep.findCaseReviews({
      $or: [
        {
          authority: user._id,
        },
        { assigned: user._id },
      ],
    });
    res.status(200).json({ status: 'success', data: caseReviews });
  } catch (error: any) {
    res.status(error.status).json({
      status: 'failed',
      message: error.message,
    });
    next(error);
  }
};

const getCaseReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const caseReviewId: string = req.params.id;
    const caseReview = await caseReviewRep.findCaseReviewById(caseReviewId);

    res.status(200).json({
      status: 'success',
      data: caseReview,
    });
  } catch (error: any) {
    res.status(error.status).json({
      status: 'failed',
      message: error.message,
    });
    next(error);
  }
};

const updateCaseReviewById = async (
  req: Request<{ id: string }, {}, UpdateCaseReviewInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const caseReviewId: string = req.params.id;
    const caseReview = await caseReviewRep.updateCaseReviewById(
      caseReviewId,
      req.body
    );

    res.status(200).json({
      status: 'success',
      data: caseReview,
    });
  } catch (error: any) {
    res.status(error.status).json({
      status: 'failed',
      message: error.message,
    });
    next(error);
  }
};

router.use(deserializeUser, requireUser);
router.post('/', validate(createCaseReviewValidation), createCaseReview);
router.get('/', getCaseReviews);
router.get('/:id', getCaseReviewById);
router.put('/:id', restrictTo('admin'), updateCaseReviewById);

export default router;
