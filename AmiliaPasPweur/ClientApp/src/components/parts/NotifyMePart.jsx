import React, { Component } from 'react';
import { Input, Button } from "semantic-ui-react";

export class NotifyMePart extends Component {
  render() {
    return (
      <div>
        <h1>Sorry bro</h1>
        <Input placeholder="Email" className="mb4">
          <input />
        </Input>
        <Button basic inverted>Notify Me</Button>
      </div>
    );
  }
}
