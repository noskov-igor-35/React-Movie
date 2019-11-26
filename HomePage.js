import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import {navigate} from 'hookrouter';
import Previewer from './Previewer'
import PaginationBar from './Pagination'
import { getMovieListWithGenres } from './API';

const LAYOULS_LINES = 12;

class HomePage extends Component {
  // Метод получения актуальных размеров корневой ноды
  updateDimensions() {
      // Получаем ширину корневого элемента и записываем значение в state
      this.setState({width : this.homePageRef.current.offsetWidth});
  }

  handleClick(id) {
    navigate(`/movie/${id}`);
  }

  // Метод получающий кол-во элементов в строке в зависимости от ширины
  getCountItemsInRow() {
    let count;
    if (this.state.width < 540) {
      count = 1;
    } else if (this.state.width < 768) {
      count = 2;
    } else if (this.state.width < 1200) {
      count = 3;
    } else if (this.state.width < 1600) {
      count = 4;
    } else {
      count = 6;
    }
    return count;
  }

  // Метод формирующий верстку с фильмами для компонента
  getList() {
    // Определим кол-во записей в строке в зависимости от ширины
    
    const count = this.state.movies.length;
    const rowCount = this.getCountItemsInRow();
    const rows = [];

    // Сформируем набор строк
    for (let i=0; i < count; i = i + rowCount) {
      rows.push(this.state.movies.slice(i, i + rowCount))
    }

    // Вернем верстку
    return <Container> {
      rows.map((row, i) => {
        // Возвращаем строку
        return <Row key={`${i}`}> {
          // Внутри стоки разбираем записи на колонки
          row.map((item) =>
            <Col className='d-flex py-3' xs={ LAYOULS_LINES/rowCount } key={ `${item.id}` }>
              <Previewer data={ item } handleClick={this.handleClick}/>
            </Col>
          )
        } </Row>
      })
    }</Container>
  }

  constructor(props) {
    super(props);

    // Связываем функцию обрабатывающию смену размера
    this.updateDimensions = this.updateDimensions.bind(this);

    // Получим корневой элемент компонента для считывания ширины
    this.homePageRef = React.createRef();

    this.state = {
      isLoad: false,
      width: null
    };
  }

  render() {
    // Если фильмы загрузились, отобразим их
    const layout = this.state.isLoad ? this.getList() : <Spinner color="warning" />
    return (
      <div ref={ this.homePageRef } className="HomePage d-flex flex-column flex-grow-1">
        <div className='py-5 px-4 bg-light d-flex flex-grow-1 align-items-center justify-content-center'>
          { layout }
        </div>
        <PaginationBar selectedPage={ this.state.page } maxPage={ this.state.maxPage} width={this.state.width}/>
      </div>
    );
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    // Получим спосок фильмов для страницы
    getMovieListWithGenres(this.props.id).then((data) => {
      this.setState({
        page: data.page,
        maxPage: data.maxPage,
        movies: data.movies,
        isLoad: true
      });
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      // Получим спосок фильмов для страницы
      getMovieListWithGenres(this.props.id).then((data) => {
        this.setState({
          page: data.page,
          maxPage: data.maxPage,
          movies: data.movies
        });
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

export default HomePage;