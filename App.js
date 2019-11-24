import React from 'react';
import Router from './Router';
import {Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

function App() {
    return (
        <div className="App app-min-height-100 c-flex c-flex-direction-column">
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">React Movie</NavbarBrand>
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/likes">Избранное</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Router/>
        </div>
    );
};

export default App;