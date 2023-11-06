import React, { useState } from 'react';
import { Image, ListGroup, Modal } from 'react-bootstrap';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const currentUser = getCurrentUser();
  if (isLoading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <BlankState message="No comments yet" />;
  }

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <ListGroup style={{ pointerEvents: 'none' }}>
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
            {comment.imageUrl && (
              <Image
                src={comment.imageUrl}
                width="100%"
                className="mb-2"
                onClick={() => openImageModal(comment.imageUrl)}
              />
            )}
            <p>{comment.message}</p>
          </div>
        </ListGroup.Item>
      ))}
      <Modal show={selectedImage !== null} onHide={closeImageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={selectedImage ? selectedImage : ''} fluid />
        </Modal.Body>
      </Modal>
    </ListGroup>
  );
};

export default CommentList;
