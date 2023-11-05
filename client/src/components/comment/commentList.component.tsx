import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Moment from 'react-moment';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPaperclip,
  faPaperPlane,
  faS,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';

import { getCurrentUser } from '../../services/auth.service';
import BlankState from '../common/blankState.component';
import Loading from '../common/loading.component';

library.add(faS, faSmile, faPaperPlane, faPaperclip);

type Props = {
  data: any;
  isLoading: boolean;
};

const CommentList: React.FC<Props> = ({ data, isLoading }) => {
  const currentUser = getCurrentUser();
  if (isLoading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <BlankState message="No comments yet" />;
  }

  return (
    <ListGroup>
      {data.map((comment: any) => (
        <ListGroup.Item
          disabled
          action
          as="li"
          key={comment._id}
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <small>
              <Moment format="LLL" date={comment.createdAt} />
            </small>
            <dd
              className={
                comment.commenter._id === currentUser._id ? 'fw-bold' : ''
              }
            >
              {comment.commenter.name}{' '}
              {comment.commenter._id === currentUser._id && '(You)'}
            </dd>
            <p>{comment.message}</p>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;
