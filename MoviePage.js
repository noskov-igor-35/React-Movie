import React from 'react';
import {Container, Row, Col, Jumbotron} from 'reactstrap';

function MoviePage() {
  return (
    <div className="MoviePage">
      <Jumbotron>
        <Container>
            <Row>
                <Col>
                    <h1>I'm a MoviePage</h1>
                </Col>
            </Row>
        </Container>
    </Jumbotron>
      
    </div>
  );
}

export default MoviePage;
