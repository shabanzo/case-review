import { FilterQuery } from 'mongoose';

import redisClient from '../../../utils/redis';
import caseReviewModel from '../caseReview.model';
import caseReviewService from '../caseReview.service';
import {
  CreateCaseReviewInput,
  UpdateCaseReviewInput,
} from '../caseReview.validation';

jest.mock('../../../utils/redis', () => ({
  del: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
}));

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
    time: JSON.stringify(new Date()),
    zone: 'Test Zone',
    camera: 'Test Camera',
    team: 'Test Team',
    status: 'submitted',
    authority: 'authority',
    assigned: 'assigned',
  };

  const createCaseReviewData: CreateCaseReviewInput = {
    imageUrl: 'image.png',
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
      populate: jest.fn().mockImplementationOnce(() => ({
        populate: jest.fn().mockImplementationOnce(() => ({
          lean: jest.fn().mockReturnValue(testCaseReviewData),
        })),
      })),
    }));
    (caseReviewModel.find as jest.Mock).mockImplementationOnce(() => ({
      populate: jest.fn().mockReturnValue([testCaseReviewData]),
    })),
      (caseReviewModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
        testCaseReviewData
      );
  });
  describe('createCaseReview', () => {
    it('should create a case review', async () => {
      const createdCaseReview = await caseReviewService.createCaseReview(
        createCaseReviewData
      );
      expect(createdCaseReview).toMatchObject(testCaseReviewData);
    });
  });

  describe('findCaseReviewById', () => {
    it('should find a case review by ID', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      const foundCaseReview = await caseReviewService.findCaseReviewById('123');
      expect(foundCaseReview).toMatchObject(testCaseReviewData);
    });

    it('should return cached case review by ID if the cached one is existed', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(
        JSON.stringify(testCaseReviewData)
      );
      const foundCaseReview = await caseReviewService.findCaseReviewById('123');
      expect(foundCaseReview).toMatchObject(testCaseReviewData);
    });
  });

  describe('findCaseReviews', () => {
    it('should find case reviews with filter', async () => {
      const query: FilterQuery<any> = { status: 'submitted' };
      const caseReviews = await caseReviewService.findCaseReviews(query);
      expect(caseReviews).toHaveLength(1);
      expect(caseReviews[0]).toMatchObject(testCaseReviewData);
    });
  });

  describe('updateCaseReviewById', () => {
    it('should update a case review by ID', async () => {
      (redisClient.del as jest.Mock).mockResolvedValue('OK');
      const updatedCaseReview = await caseReviewService.updateCaseReviewById(
        '123',
        updateCaseReviewData
      );
      expect(updatedCaseReview).toMatchObject(testCaseReviewData);
    });
  });
});
