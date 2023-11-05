import EmojiPicker from 'emoji-picker-react';
import React, { useRef, useState } from 'react';
import { Card, FormControl } from 'react-bootstrap';
import { useQuery } from 'react-query';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPaperclip,
  faPaperPlane,
  faS,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  createTextComment,
  getAllComments,
} from '../../services/comment.service';
import BlankState from '../common/blankState.component';
import CommentList from './commentList.component';

library.add(faS, faSmile, faPaperPlane, faPaperclip);

type Props = {
  selectedId: string | undefined;
};

const Comment: React.FC<Props> = ({ selectedId }) => {
  const commentInputRef = useRef<HTMLInputElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ['comments', selectedId],
    () => {
      if (!selectedId) {
        return Promise.resolve(null);
      }
      return getAllComments(selectedId);
    },
    {
      enabled: !!selectedId,
    }
  );

  if (!selectedId) {
    return <BlankState message="Please select one of the cases" />;
  }

  const handleEmojiSelect = (emojiObj: any) => {
    const commentText = commentInputRef.current?.value || '';
    const updatedCommentText = commentText + emojiObj.emoji;
    commentInputRef.current!.value = updatedCommentText;
  };

  const handleComment = async (commentText: string) => {
    if (commentText) {
      await createTextComment(selectedId, commentText);
      refetch();
      if (commentInputRef.current) {
        commentInputRef.current.value = '';
      }
    }
  };

  const handleCommentClick = () => {
    const commentText = commentInputRef.current?.value;
    if (commentText !== undefined) {
      handleComment(commentText);
    }
  };

  return (
    <>
      <Card.Body className="comment-body overflow-y-scroll">
        <h6>Comments</h6>
        <CommentList data={data} isLoading={isLoading} />
      </Card.Body>
      <Card.Footer className="bg-white text-muted d-flex justify-content-start align-items-center p-3">
        <FormControl
          type="text"
          placeholder="Type comment"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const commentText = commentInputRef.current?.value ?? '';
              handleComment(commentText);
            }
          }}
          ref={commentInputRef}
        />
        <a className="ms-1 text-muted" href="#!">
          <FontAwesomeIcon icon={['fas', 'paperclip']} />
        </a>
        <a
          className="ms-3 text-muted"
          href="#!"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FontAwesomeIcon icon={['fas', 'smile']} />
        </a>
        <a className="ms-3" href="#!" onClick={handleCommentClick}>
          <FontAwesomeIcon icon={['fas', 'paper-plane']} />
        </a>
        {showEmojiPicker && (
          <div className="emoji-picker shadow">
            <EmojiPicker onEmojiClick={handleEmojiSelect} width="100%" />
          </div>
        )}
      </Card.Footer>
    </>
  );
};

export default Comment;
