import React from 'react';
import {
  Card,
  Col,
  Figure,
  Form,
  FormControl,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import Moment from 'react-moment';
import { useQuery } from 'react-query';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPaperclip,
  faPaperPlane,
  faS,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { humanizeCamelCase } from '../common/StringHelper';
import { getCaseReviewDetails } from '../services/caseReview.service';
import BlankState from './blankState.component';
import Loading from './loading.component';

library.add(faS, faSmile, faPaperPlane, faPaperclip);

type Props = {
  selectedId: string | undefined;
};

const CaseDetails: React.FC<Props> = ({ selectedId }) => {
  const { data, isLoading, isError } = useQuery(
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
                Daniel Bakerman
              </Col>
              <Col as="dt" className="col-sm-4">
                Team
              </Col>
              <Col as="dd" className="p-0 col-sm-6 border-bottom">
                PTSM Pte Ltd
              </Col>
              <Col as="dt" className="col-sm-4">
                Assigned
              </Col>
              <Col as="dd" className="p-0 col-sm-6">
                <Form.Select size="sm" aria-label="Default select">
                  <option value="1">Chad Lakefield</option>
                  <option value="2">Daniel Bakerman</option>
                  <option value="3">John Vujovic</option>
                </Form.Select>
              </Col>
              <Col as="dt" className="col-sm-4">
                Status
              </Col>
              <Col as="dd" className="p-0 col-sm-6">
                <Form.Select size="sm" aria-label="Default select">
                  <option value="submitted">Submitted</option>
                  <option value="inReview">In Review</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Col>
            </Row>
          </div>
          <Card className="comment w-50">
            <Card.Header className="py-3">
              <h5 className="mb-1">PTSM Pte Ltd</h5>
              <p>Not wearing PPE Equipment</p>
            </Card.Header>
            <Card.Body className="comment-body overflow-y-scroll">
              <h6>Comments</h6>

              <ListGroup>
                <ListGroup.Item
                  disabled
                  action
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <small>Aug 23, 2021 14:11:08 PM</small>
                    <dd>Daniel Bakerman (You)</dd>
                    <p>
                      lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                      lorem ipsum dolor sit amet
                    </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  disabled
                  action
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <small>Aug 23, 2021 14:12:08 PM</small>
                    <dd>Chad Lakefield</dd>
                    <p>
                      lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                      lorem ipsum dolor sit amet
                    </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  disabled
                  action
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <small>Aug 23, 2021 14:12:08 PM</small>
                    <dd>Chad Lakefield</dd>
                    <p>
                      lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                      lorem ipsum dolor sit amet
                    </p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer className="bg-white text-muted d-flex justify-content-start align-items-center p-3">
              <FormControl type="text" placeholder="Type comment"></FormControl>
              <a className="ms-1 text-muted" href="#!">
                <FontAwesomeIcon icon={['fas', 'paperclip']} />
              </a>
              <a className="ms-3 text-muted" href="#!">
                <FontAwesomeIcon icon={['fas', 'smile']} />
              </a>
              <a className="ms-3" href="#!">
                <FontAwesomeIcon icon={['fas', 'paper-plane']} />
              </a>
            </Card.Footer>
          </Card>
        </Card.Body>
      </Card>
    </Card.Body>
  );
};

export default CaseDetails;
