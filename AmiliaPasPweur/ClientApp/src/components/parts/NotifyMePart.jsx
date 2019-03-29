import React, { Component } from 'react';
import { Input, Button } from "semantic-ui-react";

  render() {
    const {sport, location, email, success} = this.props;

    return (
      <div>
        <h1>Sorry bro</h1>
        <Input placeholder="Email" className="mb4">
        </Input>

        <Button primary onClick={() => this.props.notifyMe(sport, location, email)}>Notify Me</Button>

        { success && <h1>GREAT SUCCESS YOU'RE ARE GOING TO BE NOTIFIED</h1> }

      </div>
    );
  }

function mapStateToProps(state) {
  return {
    sport: state.sweat.query.sport,
    location: state.sweat.query.location,
    email: state.sweat.notify.email,
    success: state.sweat.notify.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    notifyMe: bindActionCreators(notifyMe, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifyMePart);
