import { getModelForClass, prop, Ref } from '@typegoose/typegoose';

import { CaseReview } from '../caseReview/caseReview.model';
import { User } from '../user/user.model';

export class Comment {
  @prop({ required: true })
  message!: string;

  @prop({ required: true })
  time!: Date;

  @prop({ ref: () => User, required: true })
  commenter!: Ref<User>;

  @prop({ ref: () => CaseReview })
  case!: Ref<CaseReview>;
}
const commentModel = getModelForClass(Comment);
export default commentModel;
