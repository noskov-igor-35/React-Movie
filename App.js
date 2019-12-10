import React, { Component } from 'react';
import Router from './Router';
import { navigate } from 'hookrouter';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import WidthContext from './WidthContext';

class App extends Component {
    constructor(props) {
        super(props);

        // Связываем функцию обрабатывающию смену размера
        this.updateDimensions = this.updateDimensions.bind(this);

        // Получим корневой элемент компонента для считывания ширины
        this.baseRef = React.createRef();

        this.state = {
            width: 0
        };
    }
    

    setWidth() {
        this.setState(({ width }) => ({ width }));
    }

    // Метод получения актуальных размеров корневой ноды
    updateDimensions() {
        // Получаем ширину корневого элемента и записываем значение в state
        this.setState({width : this.baseRef.current.offsetWidth});
    }

    // Метод осуществляющий переход без перезагрузки страницы
    goTo(path) {
        navigate(path);
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        const {width} = this.state;
        return (
            <div ref={ this.baseRef } className="App rc-app_min-height--100 d-flex flex-column">
                <WidthContext.Provider value={{ width }}>
                    <Navbar color="dark" dark expand="md">
                        <NavbarBrand
                            className='text-white rc_cursor--pointer'
                            onClick={this.goTo.bind(this, "/")}>
                                React Movie
                        </NavbarBrand>
                        <Nav className="ml-auto rc-display--none" navbar>
                            <NavItem>
                                <NavLink 
                                    className='text-white rc_cursor--pointer' 
                                    onClick={this.goTo.bind(this, "/likes")}>
                                        Избранное
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    <Router/>
                </WidthContext.Provider>
            </div>
        );
    }
};
export default App;