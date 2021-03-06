import React, { Component } from 'react';
import logo from '../assets/icone-blue.png';
import { Link } from 'react-router-dom';

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
      <header className="dn shadow-5 ma0 pa4 bg-white">
        <div className="flex items-center ">
            <img src={logo} className="w6 h-auto mr6" alt=""/>
            <Link to="/" className="decathlon f7 lh-solid no-underline mr6 bb b--transparent hover-b--decathlon">Home</Link>
            <Link to="/query" className="decathlon f7 lh-solid no-underline mr6 bb b--transparent hover-b--decathlon">Query</Link>
            <Link to="/loading" className="decathlon f7 lh-solid no-underline mr6 bb b--transparent hover-b--decathlon">Loading</Link>
            <Link to="/result" className="decathlon f7 lh-solid no-underline mr6 bb b--transparent hover-b--decathlon">Result</Link>
            <Link to="/notify-me" className="decathlon f7 lh-solid no-underline mr6 bb b--transparent hover-b--decathlon">Notify Me</Link>
            <Link to="/admin" className="decathlon f7 lh-solid no-underline mr6 bb b--transparent hover-b--decathlon">Admin</Link>
          </div>
      </header>
    );
  }
}
