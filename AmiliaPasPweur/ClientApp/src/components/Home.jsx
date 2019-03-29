import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
export class Home extends Component {

  render () {
    return (
      <div className="pt6">
        <div className="search mw6 center">
            <Button basic inverted className="tall fluid">Search</Button>
        </div>
      </div>
    );
  }
}
