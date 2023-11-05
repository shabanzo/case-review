import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

import { CaseReview } from '../caseReview/caseReview.model';
import { User } from '../user/user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comment {
  @prop({ required: true })
  message!: string;

  @prop({ ref: () => User, required: true })
  commenter!: Ref<User>;

  @prop({ ref: () => CaseReview })
  case!: Ref<CaseReview>;
}
const commentModel = getModelForClass(Comment);
export default commentModel;
