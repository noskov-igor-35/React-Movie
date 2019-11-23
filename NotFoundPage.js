import React from 'react';
import {Container, Row, Col, Jumbotron} from 'reactstrap';

function NotFoundPage() {
  return (
    <div className="NotFoundPage">
      <Jumbotron>
        <Container>
            <Row>
                <Col>
                    <h1>404</h1>
                </Col>
            </Row>
        </Container>
    </Jumbotron>
      
    </div>
  );
}

export default NotFoundPage;

