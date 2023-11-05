import React from 'react';
import { Card, Col, Figure, Form, Image, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { useQuery } from 'react-query';

import { IsAdmin } from '../../common/Role';
import {
  capitalizeFirstLetter,
  humanizeCamelCase,
} from '../../common/StringHelper';
import {
  getCaseReviewDetails,
  updateCaseReviewDetails,
} from '../../services/caseReview.service';
import Comment from '../comment/comment.component';
import BlankState from '../common/blankState.component';
import Loading from '../common/loading.component';
import AssignCaseReview from './assignCaseReview.component';

type Props = {
  selectedId: string | undefined;
  refetchList: () => void;
};

const CaseDetails: React.FC<Props> = ({ selectedId, refetchList }) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ['caseReview', selectedId],
    () => {
      if (!selectedId) {
        return Promise.resolve(null);
      }
      return getCaseReviewDetails(selectedId);
    },
    {
      enabled: !!selectedId,
    }
  );

  if (!selectedId) {
    return <BlankState message="Please select one of the cases" />;
  }

  if (isLoading || isError || !data) {
    return <Loading />;
  }

  const caseReview = data;

  const handleSelectStatus = async (value: string) => {
    await updateCaseReviewDetails(selectedId, { status: value });
    refetch();
    refetchList();
  };

  const handleOnAssign = async (value: string) => {
    await updateCaseReviewDetails(selectedId, {
      assigned: value,
    });
    refetch();
    refetchList();
  };

  return (
    <Card.Body>
      <div className="d-flex mb-3 case-details">
        <div className="w-50 case-details-info">
          <Row className="mb-3">
            <Col>
              <h5 className="mb-1">Review Submitted</h5>
              <h6 className="mb-1">Case ID: #{caseReview._id}</h6>
              <small className="text-muted">
                Updated <Moment format="LLL" date={caseReview.updatedAt} />
              </small>
            </Col>
          </Row>
          <Row as="dl">
            <Col as="dt" className="col-sm-4">
              Alert:
            </Col>
            <Col as="dd" className="col-sm-8">
              {caseReview.alert}
            </Col>
            <Col as="dt" className="col-sm-4">
              Time:
            </Col>
            <Col as="dd" className="col-sm-8">
              <Moment format="LLL" date={caseReview.time} />
            </Col>
            <Col as="dt" className="col-sm-4">
              Zone:
            </Col>
            <Col as="dd" className="col-sm-8">
              {caseReview.zone}
            </Col>
            <Col as="dt" className="col-sm-4">
              Camera:
            </Col>
            <Col as="dd" className="col-sm-8">
              {caseReview.camera}
            </Col>
            <Col as="dt" className="col-sm-4">
              Authority:
            </Col>
            <Col as="dd" className="col-sm-8">
              {caseReview.authority.name}
            </Col>
            <Col as="dt" className="col-sm-4">
              Status:
            </Col>
            <Col as="dd" className="col-sm-8">
              {humanizeCamelCase(caseReview.status)}
            </Col>
          </Row>
        </div>
        <div className="w-50">
          <Figure>
            <Figure.Image className="rounded-3" src={caseReview.imageUrl} />
          </Figure>
        </div>
      </div>
      <Card className="shadow-sm">
        <Card.Body className="d-flex">
          <div className="case-review-details w-50">
            <h5 className="mb-3">Case Review</h5>
            <Row as="dl">
              <Col as="dt" className="col-sm-4">
                Authority
              </Col>
              <Col as="dd" className="p-0 col-sm-6 border-bottom">
                {caseReview.authority.name}
              </Col>
              <Col as="dt" className="col-sm-4">
                Team
              </Col>
              <Col as="dd" className="p-0 col-sm-6 border-bottom">
                {caseReview.team}
              </Col>
              <Col as="dt" className="col-sm-4">
                Assigned
              </Col>
              <Col
                as="dd"
                className={`p-0 col-sm-6 ${!IsAdmin() && 'border-bottom'}`}
              >
                {IsAdmin() ? (
                  <AssignCaseReview
                    assignedId={caseReview.assigned._id}
                    handleOnAssign={handleOnAssign}
                  />
                ) : (
                  caseReview.assigned.name
                )}
              </Col>
              <Col as="dt" className="col-sm-4">
                Status
              </Col>
              <Col
                as="dd"
                className={`p-0 col-sm-6 ${!IsAdmin() && 'border-bottom'}`}
              >
                {IsAdmin() ? (
                  <Form.Select
                    size="sm"
                    value={caseReview.status}
                    onChange={(e) => handleSelectStatus(e.target.value)}
                  >
                    <option value="submitted">Submitted</option>
                    <option value="inReview">In Review</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                ) : (
                  capitalizeFirstLetter(caseReview.status)
                )}
              </Col>
            </Row>
          </div>
          <Card className="comment w-50">
            <Card.Header className="py-3">
              <h5 className="mb-1">{caseReview.team}</h5>
              <p>{caseReview.description}</p>
            </Card.Header>
            <Comment selectedId={selectedId} />
          </Card>
        </Card.Body>
      </Card>
    </Card.Body>
  );
};

export default CaseDetails;
