import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header className="shadow-4 ma0 pa4">
          <div>
            <Link to="/" className="decathlon f7 lh-solid no-underline mr6 bb b--transparent hover-b--decathlon">AmiliaPasPweur</Link>
            <Link to="/counter" className="decathlon f7 lh-solid no-underline mr6 bb b--transparent hover-b--decathlon">Counter</Link>
            <Link to="/fetch-data" className="decathlon f7 lh-solid no-underline mr6 bb b--transparent hover-b--decathlon">Fetch</Link>
          </div>
      </header>
    );
  }
}
