import React from 'react';
import {
  Badge,
  Card,
  Col,
  Container,
  Figure,
  FormControl,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useQuery } from 'react-query';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPaperclip,
  faPaperPlane,
  faS,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getCurrentUser } from '../services/user.service';

library.add(faS, faSmile, faPaperPlane, faPaperclip);
const CaseReview: React.FC = () => {
  const { data, error, isLoading } = useQuery('currentUser', getCurrentUser);
  return (
    <Container fluid="md">
      <Row>
        <Col md={3}>
          <Card className="shadow">
            <Card.Header>Case List</Card.Header>
            <Card.Body className="case-list">
              <ListGroup>
                <ListGroup.Item
                  disabled
                  action
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">#1234567890</div>
                    <small>Aug 23, 2021 14:11:08 PM</small>
                  </div>
                  <Badge pill bg="danger">
                    High Risk
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Header>Case Details</Card.Header>
            <Card.Body>
              <div className="d-flex mb-3">
                <Container className="w-50">
                  <Row>
                    <Col>
                      <h5>Review Submitted</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6>Case ID: #1234567890</h6>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <small className="text-muted">
                        Updated Aug 25, 2022 11:12 AM
                      </small>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <strong>Alert:</strong>
                    </Col>
                    <Col>Object Obtrusion</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <strong>Time:</strong>
                    </Col>
                    <Col>Aug 23, 2021 14:11:08 PM</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <strong>Zone:</strong>
                    </Col>
                    <Col>L2A - J1 Facility Area</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <strong>Camera:</strong>
                    </Col>
                    <Col>L1-21</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <strong>Authority:</strong>
                    </Col>
                    <Col>Daniel Bakerman</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <strong>Status:</strong>
                    </Col>
                    <Col>Completed</Col>
                  </Row>
                </Container>
                <Figure className="w-50">
                  <Figure.Image
                    className="rounded-3"
                    src="https://videos.cctvcamerapros.com/wp-content/files/AI-Security-Camera-Human-Detection.jpg"
                  />
                </Figure>
              </div>
              <Card className="shadow-sm">
                <Card.Body className="d-flex">
                  <div className="w-50">
                    <h5 className="mb-3">Case Review</h5>
                    <Row className="mb-2">
                      <Col>
                        <strong>Authority*</strong>
                      </Col>
                      <Col>Daniel Bakerman</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <strong>Team</strong>
                      </Col>
                      <Col>PTSM Pte Ltd</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <strong>Assigned</strong>
                      </Col>
                      <Col>Chard Lakefield</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <strong>Status</strong>
                      </Col>
                      <Col>Completed</Col>
                    </Row>
                  </div>
                  <Card className="comment w-50">
                    <Card.Header>
                      <h5>PTSM Pte Ltd</h5>
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
                            <div className="fw-bold">Daniel Bakerman</div>
                            <p>
                              lorem ipsum dolor sit amet lorem ipsum dolor sit
                              amet lorem ipsum dolor sit amet
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
                            <div className="fw-bold">Chad Lakefield</div>
                            <p>
                              lorem ipsum dolor sit amet lorem ipsum dolor sit
                              amet lorem ipsum dolor sit amet
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
                            <div className="fw-bold">Chad Lakefield</div>
                            <p>
                              lorem ipsum dolor sit amet lorem ipsum dolor sit
                              amet lorem ipsum dolor sit amet
                            </p>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer className="bg-white text-muted d-flex justify-content-start align-items-center p-3">
                      <FormControl
                        type="text"
                        placeholder="Type comment"
                      ></FormControl>
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CaseReview;
