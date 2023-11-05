import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

import { User } from '../user/user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class CaseReview {
  @prop({ required: true })
  imageUrl!: string;

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
  authority!: Ref<User>;

  @prop({ ref: () => User })
  assigned?: Ref<User>;
}
const caseReviewModelModel = getModelForClass(CaseReview);
export default caseReviewModelModel;
