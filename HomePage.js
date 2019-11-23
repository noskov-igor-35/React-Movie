import React from 'react';
import {Container, Row, Col, Jumbotron} from 'reactstrap';

function HomePage() {
  return (
    <div className="HomePage">
      <Jumbotron>
        <Container>
            <Row>
                <Col>
                    <h1>I'm a HomePage</h1>
                </Col>
            </Row>
        </Container>
    </Jumbotron>
      
    </div>
  );
}

export default HomePage;