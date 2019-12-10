import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { navigate } from 'hookrouter';
import WidthContext from './WidthContext';

class PaginationBar extends Component {
  // Метод осуществляющий переход без перезагрузки страницы
  goTo(id) {
    navigate(`/page/${id}`);
  }

  // Метод получения кнопки перехода в начало
  getFirst() {
    return <PaginationLink first onClick={this.goTo.bind(this, 1)}/>
  }

  // Метод получения кнопки перехода в конец
  getLast() {
    return <PaginationLink last onClick={this.goTo.bind(this, this.props.maxPage)}/>
  }

  // Метод получения кнопок крайних страниц
  getEndBtn(isLast = false) {
    // Если получаем первую страницу и выбрана первая или аналогично последнию дизэблим кнопку
    if ((this.props.selectedPage === 1 && !isLast) || (this.props.selectedPage === this.props.maxPage && isLast)) {
      return <PaginationItem key={`${ isLast }`} disabled> { isLast ? this.getLast() : this.getFirst()} </PaginationItem>
    } else {
      return <PaginationItem key={`${ isLast }`}> { isLast ? this.getLast() : this.getFirst()} </PaginationItem>
    }
  }

  // Метод получения активной кнопки навигаиции
  getSelectedNumberBtn(item) {
    return <PaginationItem key={`${item}`} active>
      <PaginationLink onClick={this.goTo.bind(this, item)}>
        { item }
      </PaginationLink>
    </PaginationItem>
  }

  // Метод получения кнопки навигаиции к определенной странице
  getNumberBtn(item) {
    return <PaginationItem key={`${item}`}>
      <PaginationLink onClick={this.goTo.bind(this, item)}>
        { item }
      </PaginationLink>
    </PaginationItem>
  }

  // Метод получения числовой кнопки
  getNumbersBtn() {
    const items = [];

    // Пройдемся по списку если номер совпадает с текуще страницей, выведем активарованную кнопку
    for(let i = this.state.minPage; i<=this.state.maxPage; i++) {
      items.push(this.props.selectedPage === i ? this.getSelectedNumberBtn(i) : this.getNumberBtn(i));
    }
    return items;
  }

  constructor(props) {
    super(props);

    this.state = {
      minPage: null,
      maxPage: null,
      width: null
    };
  }

  static contextType = WidthContext;

  static getDerivedStateFromProps(props) {
    const step = 2;

    // При изменении props обновим крайние значения
    return {
      minPage: props.selectedPage - step > 0? props.selectedPage - step : 1,
      maxPage: props.selectedPage + step < props.maxPage ? props.selectedPage + step : props.maxPage
    }
  }

  render() {
    const { width } = this.context;
    let pagination;

    // Вычисляем размер панели в зависимости от разрешения
    let size;
    if (width < 768) {
      size = 'sm';
    } else if (width < 1024) {
      size = 'md';
    } else {
      size = 'lg';
    }

    // Если пришла максимальная страница и вычислина ширина, то сфомируем пагинацию
    if (this.state.maxPage && width) {
      pagination = <Pagination size={ size } aria-label="Page navigation">
        { this.getEndBtn() }
        { this.getNumbersBtn() }
        { this.getEndBtn(true) }
      </Pagination>
    }
    return (
      <div className='PaginationBar d-flex justify-content-center bg-light pb-3'>
        { pagination }
      </div>
    );
  }
}

export default PaginationBar;