import { getModelForClass, prop, Ref } from '@typegoose/typegoose';

import { User } from '../user/user.model';

export class CaseReview {
  @prop({ required: true })
  alert!: string;

  @prop({ default: 'mid' })
  priority!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  time!: Date;

  @prop({ required: true })
  zone!: string;

  @prop({ required: true })
  camera!: string;

  @prop({ required: true })
  team!: string;

  @prop({ default: 'submitted' })
  status!: string;

  @prop({ ref: () => User, required: true })
  authorityId!: Ref<User>;

  @prop({ ref: () => User })
  assignedId?: Ref<User>;
}
const caseReviewModelModel = getModelForClass(CaseReview);
export default caseReviewModelModel;
