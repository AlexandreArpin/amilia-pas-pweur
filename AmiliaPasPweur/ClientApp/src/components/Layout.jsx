import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <>
        <NavMenu />
        <div className="">
          {this.props.children}
        </div>
      </>
    );
  }
}
