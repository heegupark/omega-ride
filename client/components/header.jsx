import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar collapseOnSelect className="ride-dark fixed-top">
          <Navbar.Brand href="/">
            <span className="ride-pink logo">o-ride</span>
          </Navbar.Brand>
        </Navbar>
      </header>
    );
  }
}

export default Header;
