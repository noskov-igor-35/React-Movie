import React, { Component } from 'react';
import Router from './Router';
import { navigate } from 'hookrouter';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class App extends Component{
    // Метод осуществляющий переход без перезагрузки страницы
    goTo(path) {
        navigate(path);
    }

    render() {
        return (
            <div className="App rc-app_min-height--100 d-flex flex-column">
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
            </div>
        );
    }
};
export default App;