import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: (route) => dispatch(push(route))
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={ 1 } href="#">Link</NavItem>
              <NavItem eventKey={ 2 } href="#">Link</NavItem>
              <NavDropdown eventKey={ 3 } title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={ 3.1 }>Action</MenuItem>
                <MenuItem eventKey={ 3.2 }>Another action</MenuItem>
                <MenuItem eventKey={ 3.3 }>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={ 3.3 }>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={ 1 } href="#">Link Right</NavItem>
              <NavItem eventKey={ 2 } href="#">Link Right</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);