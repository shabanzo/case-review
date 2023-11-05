import React from 'react';
import { Badge, ListGroup, Row } from 'react-bootstrap';
import Moment from 'react-moment';

import {
  capitalizeFirstLetter,
  humanizeCamelCase,
} from '../../common/StringHelper';
import BlankState from '../common/blankState.component';
import Loading from '../common/loading.component';

type Props = {
  selectedId?: string;
  onClickCase: (caseReviewId: string) => void;
  data: any;
  isLoading: boolean;
};

const CaseReviewList: React.FC<Props> = ({
  selectedId,
  onClickCase,
  data,
  isLoading,
}) => {
  const caseReviewPriority = (priority: string): string => {
    const priorityBadge = {
      high: 'danger',
      mid: 'warning',
      low: 'secondary',
    };
    return priorityBadge[priority as keyof typeof priorityBadge];
  };

  const caseReviewStatus = (status: string): string => {
    const statusBadge = {
      submitted: 'info',
      inReview: 'info',
      completed: 'success',
    };
    return statusBadge[status as keyof typeof statusBadge];
  };

  if (isLoading || !data) return <Loading />;

  if (data.length === 0)
    return <BlankState message="You don't have any cases" />;

  return (
    <ListGroup className="case-list-group">
      {data.map((caseReview: any) => (
        <ListGroup.Item
          disabled={caseReview._id === selectedId}
          action
          as="li"
          key={caseReview._id}
          onClick={() => onClickCase(caseReview._id)}
          className="class-list-item"
        >
          <div className="d-flex justify-content-between ms-0 mb-2">
            <div className="">
              <div>
                <div className="fw-bold">#{caseReview._id}</div>
                <small>
                  <Moment format="LLL" date={caseReview.time} />
                </small>
              </div>
            </div>
            <div className="flex-shrink-1 d-flex flex-column align-items-end">
              <Badge
                pill
                bg={caseReviewPriority(caseReview.priority)}
                className="mb-1"
              >
                {capitalizeFirstLetter(caseReview.priority)} Risk
              </Badge>
              <Badge pill bg={caseReviewStatus(caseReview.status)}>
                {humanizeCamelCase(caseReview.status)}
              </Badge>
            </div>
          </div>
          <Row>
            <div>
              <dd>{caseReview.alert}</dd>
              <dd>{caseReview.zone}</dd>
              <dd>{caseReview.authority.name}</dd>
            </div>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CaseReviewList;
