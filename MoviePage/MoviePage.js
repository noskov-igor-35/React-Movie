import React, { Component } from 'react';
import { Container, Spinner } from 'reactstrap';
import { getMovie, getRecommendationsList } from '../API';
import './MoviePage.css';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w300';

class MoviePage extends Component {
  // Метод формирующий запись продолжительност фильма в двух форматах
  getRunTime(runtime) {
    let time;
    if (runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      time = `${runtime} мин. / ${hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    } else {
      time = '0 / 0:00'
    }
    return time;
  }

  // Метод формирующий читаемоую дату из даты пришедшей с БД
  getDateFromSQL(sqlDate) {
    const date = new Date(sqlDate);
    const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }

  // Метод формирующий карточку фильма
  getPage(data) {
    const title = data.title || data.original_title;
    const subTitle = data.title ? data.original_title : null;
    const genres = data.genres ? data.genres.map(genre => genre.name).join(', ') : null;
    const releaseDate = data.release_date ? this.getDateFromSQL(data.release_date) : 'неизвестна';
    return <div className='d-flex flex-fill flex-column flex-md-row'>
      <div className='flex-fill my-md-4 mx-md-4 mb-4 py-3 px-3 bg-white'>
        <img className='moviePage-logo'
          src={`${POSTER_PATH}${data.poster_path}`}
          alt={ data.title || data.original_title }
        />
      </div>
      <div className='flex-fill my-md-4 mx-md-4 mb-4 py-3 px-3 bg-white'>
        <h2>{ title }</h2>
        <h4 className='text-black-50'>{ subTitle }</h4>
        <p className='mb-1'>Дата релиза: { releaseDate }</p>
        <p>{data.overview}</p>
        <p className='mb-1'>Жанр: {genres}</p>
        <p>Продолжительность {this.getRunTime(data.runtime)}</p>
      </div>
    </div>
  }

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
        this.setState({
          data,
          isLoad: true
        });
        getRecommendationsList(this.props.id).then((data) => {
          console.log(data);
        })
      })
    }
  }

  render() {
    const page = this.state.isLoad ? this.getPage(this.state.data) : <Spinner color="warning" />
    return (
      <div className="moviePage d-flex flex-column flex-grow-1 px-md-4 py-md-5 py-3 bg-light">
        <Container className={ `d-flex ${ this.state.isLoad ? 'flex-grow-1' : 'align-items-center justify-content-center'} ` }>
          { page }
        </Container>
      </div>
    );
  }
}

export default MoviePage;