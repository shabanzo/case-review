import { FilterQuery } from 'mongoose';

import caseReviewModel, { CaseReview } from './caseReview.model';
import {
  CreateCaseReviewInput,
  UpdateCaseReviewInput,
} from './caseReview.validation';

// Create CaseReview
const createCaseReview = async (
  caseReviewData: Partial<CreateCaseReviewInput>
) => {
  return await caseReviewModel.create(caseReviewData);
};

// Find CaseReview by Id
const findCaseReviewById = async (id: string) => {
  return await caseReviewModel
    .findById(id)
    .populate('authority')
    .populate('assigned')
    .lean();
};

// Find CaseReviews with filter
const findCaseReviews = async (query: FilterQuery<CaseReview>) => {
  return await caseReviewModel.find(query);
};

// Update CaseReview by Id
const updateCaseReviewById = async (
  id: string,
  caseReviewData: Partial<UpdateCaseReviewInput>
) => {
  return await caseReviewModel.findOneAndUpdate({ _id: id }, caseReviewData, {
    new: true,
  });
};
export default {
  createCaseReview,
  findCaseReviewById,
  findCaseReviews,
  updateCaseReviewById,
};
