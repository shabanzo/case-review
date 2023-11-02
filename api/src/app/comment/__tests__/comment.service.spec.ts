import { FilterQuery } from 'mongoose';

import commentModel from '../comment.model';
import commentService from '../comment.service';
import { CreateCommentInput, UpdateCommentInput } from '../comment.validation';

jest.mock('../comment.model', () => ({
  create: jest.fn(),
  find: jest.fn(),
  findOneAndUpdate: jest.fn(),
}));

describe('Comment Service', () => {
  const testCommentData = {
    message: 'Test Comment',
    time: new Date(),
    commenter: 'commenterId',
  };

  const createCommentData: CreateCommentInput = {
    message: 'Test Comment',
    time: new Date(),
    commenter: 'commenterId',
    case: 'caseId',
  };

  const updateCommentData: UpdateCommentInput = {
    message: 'Updated Comment',
  };

  beforeAll(() => {
    (commentModel.create as jest.Mock).mockResolvedValue(testCommentData);
    (commentModel.find as jest.Mock).mockImplementationOnce(() => ({
      populate: jest.fn().mockReturnValue([testCommentData]),
      lean: jest.fn().mockReturnValue([testCommentData]),
    }));
    (commentModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
      testCommentData
    );
  });

  it('should create a comment', async () => {
    const createdComment = await commentService.createComment(
      createCommentData
    );
    expect(createdComment).toMatchObject(testCommentData);
  });

  it('should find comments with filter', async () => {
    const query: FilterQuery<any> = { commenter: 'commenterId' };
    const comments = await commentService.findComments(query);
    expect(comments).toEqual([testCommentData]);
  });

  it('should update a comment by ID', async () => {
    const updatedComment = await commentService.updateCommentById(
      '123',
      updateCommentData
    );
    expect(updatedComment).toMatchObject(testCommentData);
  });
});
