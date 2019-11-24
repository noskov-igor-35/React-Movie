import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import {navigate} from 'hookrouter';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w300/';

class Previewer extends Component {
  handleClick(id) {
    navigate(`/movie/${id}`);
  }

  render() {
    const genres = this.props.data.genres.join(', ');
    let cardSubtitle;

    // Если есть перевод названия будет дополительно выведено оригинальное
    if (this.props.data.title) {
      cardSubtitle = <CardSubtitle className="text-black-50">
        <h6>{ this.props.data.original_title }</h6>
      </CardSubtitle>
    }
    
    return (
      <div 
        className="previewer rc_height--100 rc_cursor--pointer" 
        onClick={this.handleClick.bind(this, this.props.data.id)}>
        <Card className="rc_minHeight--100">
          <CardImg 
            top width="100%" 
            src={ `${POSTER_PATH}${this.props.data.poster_path}` } 
            alt={ this.props.data.title || this.props.data.original_title }
          />
          <CardBody>
            <CardTitle><h5>{ this.props.data.title || this.props.data.original_title }</h5></CardTitle>
            { cardSubtitle }
            <CardText>{ `Жанр:  ${genres}` }</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default Previewer;