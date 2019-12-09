import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import {navigate} from 'hookrouter';
import Previewer from '../Previewer'
import PaginationBar from '../Pagination'
import { getMovieListWithGenres } from '../API';
import './HomePage.css';

class HomePage extends Component {
  handleClick(id) {
    navigate(`/movie/${id}`);
  }

  // Метод формирующий верстку с фильмами для компонента
  getList() {
    const emptyBlocks = ['empty1', 'empty2', 'empty3', 'empty4', 'empty5'];
    return <div className='d-flex justify-content-center flex-wrap'>
    {
      this.state.movies.map(item => {
        return <div className='homePage-previewerBlock d-flex flex-grow-1 py-3 px-3' key={ `${item.id}` }>
          <Previewer data={ item } width={ 500 } handleClick={this.handleClick}/>
        </div>
      })
    }
    {
      emptyBlocks.map(key => <div className="homePage-previewerBlock flex-grow-1" key={`${key}`}></div>)
    }
    </div>
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoad: false
    };
  }

  render() {
    // Если фильмы загрузились, отобразим их
    const layout = this.state.isLoad ? this.getList() : <Spinner color="warning" />
    return (
      <div className="homePage d-flex flex-column flex-grow-1">
        <div className='py-5 px-4 bg-light d-flex flex-grow-1 align-items-center justify-content-center'>
          { layout }
        </div>
        <PaginationBar selectedPage={ this.state.page } maxPage={ this.state.maxPage}/>
      </div>
    );
  }

  componentDidMount() {
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
    // Если сменилась страница (id), то нужно обновить контент
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