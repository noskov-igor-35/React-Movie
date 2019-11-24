import React, { Component } from 'react';
import {Container, Row, Col, Jumbotron, Spinner} from 'reactstrap';
import Previewer from './Previewer'
import PaginationBar from './Pagination'
import {getMovieListWithGenres} from './API';

class HomePage extends Component {
  constructor(props) {
    super(props);

    // Связываем функцию обрабатывающию смену размера
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      isLoad: false,
      width: null
    };
  }

  // Метод получения актуальных размеров корневой ноды
  updateDimensions() {
      // Получаем корневую ноду
      const node = document.getElementById('HomePage');

      // Получаем ширину ноды и записываем значение в state
      const width = node.clientWidth;
      this.setState({width});
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }
  
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    // Получим спосок фильмов для страницы
    getMovieListWithGenres(this.props.id || 1).then((data) => {
      this.setState({
        page: data.page,
        maxPage: data.maxPage,
        movies: data.movies,
        isLoad: true
      });
    })
  }

  // Метод формирующий верстку с фильмами для компонента
  getList() {
    // Определим кол-во записей в строке в зависимости от ширины
    const rowSize = this.state.width < 1000 ? 1 : 4;
    const count = this.state.movies.length;
    const rows = [];

    // Сформируем набор строк
    for (let i=0; i < count; i = i + rowSize) {
      rows.push(this.state.movies.slice(i, i + rowSize))
      
    }

    // Вернем верстку
    return rows.map((row, i) => {
      // Возвращаем строку
      return <Row key={`${i}`}> {
        // Внутри стоки разбираем записи на колонки
        row.map((item) =>
          <Col className='c-padding-15' xs={ rowSize - 1 || 12 } key={`${item.id}`}>
            <Previewer data={item}/>
          </Col>
        )
      } </Row>
    });
  }

  render() {
    // Если фильмы загрузились, отобразим их
    const layout = this.state.isLoad ? this.getList() : <Spinner color="warning" />
    return (
      <div id='HomePage' className="HomePage c-flex c-flex-direction-column c-flex-grow-1">
        <Jumbotron className='c-flex c-flex-grow-1'>
          <Container className={`${ this.state.isLoad ? '' : 'c-flex '}c-flex-align-items-center c-flex-justify-content-center`}>
            {layout}
          </Container>
        </Jumbotron>
        <PaginationBar selectedPage={ this.state.page } maxPage={ this.state.maxPage}/>
      </div>
    );
  }
}

export default HomePage;