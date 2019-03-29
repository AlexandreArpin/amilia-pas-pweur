import React, { Component } from 'react';
import { Dimmer, Loader } from "semantic-ui-react";

export default class LoadingPart extends Component {
  render() {
    return (
      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
    );
  }
}
