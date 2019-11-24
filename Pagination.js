import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class PaginationBar extends Component {

  // Метод получения кнопки перехода в начало
  getFirst() {
    return <PaginationLink first href="/page/1" />
  }

  // Метод получения кнопки перехода в конец
  getLast() {
    return <PaginationLink last href={`/page/${this.props.maxPage}`} />
  }

  // Метод получения кнопок крайних страниц
  getEndBtn(isLast) {
    // Если получаем первую страницу и выбрана первая или аналогично последнию дизэблим кнопку
    if ((this.props.selectedPage === 1 && !isLast) || (this.props.selectedPage === this.props.maxPage && isLast)) {
      return <PaginationItem disabled> { isLast ? this.getLast() : this.getFirst()} </PaginationItem>
    } else {
      return <PaginationItem> { isLast ? this.getLast() : this.getFirst()} </PaginationItem>
    }
  }

  // Метод получения активной кнопки навигаиции
  getSelectedNumberBtn(item) {
    return <PaginationItem key={`${item}`} active>
      <PaginationLink href={`/page/${item}`}>
        { item }
      </PaginationLink>
    </PaginationItem>
  }

  // Метод получения кнопки навигаиции к определенной странице
  getNumberBtn(item) {
    return <PaginationItem key={`${item}`}>
      <PaginationLink href={`/page/${item}`}>
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
      maxPage: null
    };
  }

  static getDerivedStateFromProps(props) {
    // При изменении props обновим крайние значения
    return {
      minPage: props.selectedPage - 2 > 0? props.selectedPage - 2 : 1,
      maxPage: props.selectedPage + 2 < props.maxPage ? props.selectedPage + 2 : props.maxPage
    }
  }

  render() {
    let pagination;

    // Если пришла максимальная страница, то сфомируем пагинацию
    if (this.state.maxPage) {
      pagination = <Pagination aria-label="Page navigation">
        { this.getEndBtn() }
        { this.getNumbersBtn() }
        { this.getEndBtn(true) }
      </Pagination>
    }
    return (
      <div className='PaginationBar c-flex c-flex-justify-content-center'>
        {pagination}
      </div>
    );
  }
}

export default PaginationBar;