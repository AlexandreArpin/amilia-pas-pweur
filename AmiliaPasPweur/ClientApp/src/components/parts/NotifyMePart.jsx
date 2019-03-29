import React, { Component } from 'react';
import { Input, Icon, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';

export class NotifyMePart extends Component {
  render() {
    return (
      <div>
        <h1>Sorry bro</h1>
        <Input iconPosition='left' placeholder='Email'>
          <Icon name='at' />
          <input />
        </Input>

        <Link to="/"><Button primary>Notify Me</Button></Link>
      </div>
    );
  }
}
