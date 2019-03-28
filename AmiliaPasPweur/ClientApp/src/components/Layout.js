import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="mw8 center pt6">
        <NavMenu />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
