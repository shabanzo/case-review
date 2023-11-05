import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import CaseDetails from './caseDetails.component';
import CaseReviewList from './caseReviewList.component';

const CaseReview: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const handleClickCase = (caseReviewId: string) => {
    setSelectedId(caseReviewId);
  };

  return (
    <Container fluid="md">
      <Row>
        <Col md={4}>
          <Card className="shadow">
            <Card.Header>Case List</Card.Header>
            <Card.Body>
              <CaseReviewList
                selectedId={selectedId}
                onClickCase={handleClickCase}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Header>Case Details</Card.Header>
            <CaseDetails selectedId={selectedId} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CaseReview;
