import { FilterQuery } from 'mongoose';

import caseReviewModel from '../caseReview.model';
import caseReviewService from '../caseReview.service';
import {
  CreateCaseReviewInput,
  UpdateCaseReviewInput,
} from '../caseReview.validation';

jest.mock('../caseReview.model', () => ({
  create: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  findOneAndUpdate: jest.fn(),
}));

describe('Case Review Service', () => {
  const testCaseReviewData = {
    alert: 'Test Alert',
    priority: 'low',
    description: 'Test Description',
    time: new Date(),
    zone: 'Test Zone',
    camera: 'Test Camera',
    team: 'Test Team',
    status: 'submitted',
    authority: 'authority',
    assigned: 'assigned',
  };

  const createCaseReviewData: CreateCaseReviewInput = {
    alert: 'Test Alert',
    priority: 'low',
    description: 'Test Description',
    time: new Date(),
    zone: 'Test Zone',
    camera: 'Test Camera',
    team: 'Test Team',
    status: 'submitted',
    authority: 'authority',
  };

  const updateCaseReviewData: UpdateCaseReviewInput = {
    status: 'submitted',
    assigned: 'assigned',
  };

  beforeAll(() => {
    (caseReviewModel.create as jest.Mock).mockResolvedValue(testCaseReviewData);
    (caseReviewModel.findById as jest.Mock).mockImplementationOnce(() => ({
      populate: jest.fn().mockReturnValue(testCaseReviewData),
      lean: jest.fn().mockReturnValue(testCaseReviewData),
    }));
    (caseReviewModel.find as jest.Mock).mockResolvedValue([testCaseReviewData]);
    (caseReviewModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
      testCaseReviewData
    );
  });

  it('should create a case review', async () => {
    const createdCaseReview = await caseReviewService.createCaseReview(
      createCaseReviewData
    );
    expect(createdCaseReview).toMatchObject(testCaseReviewData);
  });

  it('should find a case review by ID', async () => {
    const foundCaseReview = await caseReviewService.findCaseReviewById('123');
    expect(foundCaseReview).toMatchObject(testCaseReviewData);
  });

  it('should find case reviews with filter', async () => {
    const query: FilterQuery<any> = { status: 'submitted' };
    const caseReviews = await caseReviewService.findCaseReviews(query);
    expect(caseReviews).toHaveLength(1);
    expect(caseReviews[0]).toMatchObject(testCaseReviewData);
  });

  it('should update a case review by ID', async () => {
    const updatedCaseReview = await caseReviewService.updateCaseReviewById(
      '123',
      updateCaseReviewData
    );
    expect(updatedCaseReview).toMatchObject(testCaseReviewData);
  });
});
