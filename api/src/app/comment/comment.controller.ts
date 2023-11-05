import express, { NextFunction, Request, Response } from 'express';

import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../middleware/requireUser';
import { validate } from '../../middleware/validate';
import commentRep from './comment.service';
import {
  CreateCommentInput,
  createCommentValidation,
  UpdateCommentInput,
} from './comment.validation';

const router = express.Router();

const createComment = async (
  req: Request<{}, {}, CreateCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const createComment = await commentRep.createComment(req.body);

    res.status(201).json({
      status: 'success',
      data: createComment,
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const caseId = req.query.caseId;
    const comments = await commentRep.findComments({
      case: caseId,
    });
    res.status(200).json({ status: 'success', data: comments });
  } catch (error) {
    next(error);
  }
};

const updateCommentById = async (
  req: Request<{ id: string }, {}, UpdateCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentId: string = req.params.id;
    const comment = await commentRep.updateCommentById(commentId, req.body);

    res.status(200).json({
      status: 'success',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

router.use(deserializeUser, requireUser);
router.post('/', validate(createCommentValidation), createComment);
router.get('/', getComments);
router.put('/:id', updateCommentById);

export default router;
