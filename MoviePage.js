import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, Spinner } from 'reactstrap';
import { getMovie } from './API';

class MoviePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoad: false
    };
  }

  componentDidMount() {
    // Получим информацию о фильме
    if (this.props.id) {
      getMovie(this.props.id).then((data) => {
        console.log(data);
        this.setState({
          isLoad: true
        });
      })
    }
    
  }

  render() {
    const page = this.state.isLoad ? <h1>I'm a MoviePage</h1> : <Spinner color="warning" />
    return (
      <div id='MoviePage' className="HomePage d-flex flex-column flex-grow-1 bg-light">
          <Jumbotron className='d-flex flex-grow-1 bg-light'>
            <Container className={ `${ this.state.isLoad ? '' : 'd-flex '}align-items-center justify-content-center` }>
              <Row>
                  <Col>
                      { page }
                  </Col>
              </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default MoviePage;
