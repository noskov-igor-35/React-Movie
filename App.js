import React, { Component } from 'react';
import Router from './Router';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="inverse" light expand="md">
                  <NavbarBrand href="/">React Movie</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
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
    }
}

export default App;