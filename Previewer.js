import React from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w300/';

function Previewer(props) {
  const genres = props.data.genres.join(', ');
  return (
    <div className="Previewer c-height-100">
      <Card className="c-min-height-100">
        <CardImg top width="100%" src={`${POSTER_PATH}${props.data.poster_path}`} alt={props.data.title}/>
        <CardBody>
          <CardTitle><h5>{props.data.title}</h5></CardTitle>
          <CardSubtitle className="c-additional-color">
            <h6>{props.data.original_title}</h6>
          </CardSubtitle>
          <CardText>Жанр: {genres}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Previewer;