import { FilterQuery } from 'mongoose';

import commentModel, { Comment } from './comment.model';
import { CreateCommentInput, UpdateCommentInput } from './comment.validation';

// Create Comment
const createComment = async (commentData: Partial<CreateCommentInput>) => {
  return await commentModel.create(commentData);
};

// Find Comments with filter
const findComments = async (query: FilterQuery<Comment>) => {
  return await commentModel.find(query).populate('commenter');
};

// Update Comment by Id
const updateCommentById = async (
  id: string,
  commentData: Partial<UpdateCommentInput>
) => {
  return await commentModel.findOneAndUpdate({ _id: id }, commentData, {
    new: true,
  });
};
export default {
  createComment,
  findComments,
  updateCommentById,
};
