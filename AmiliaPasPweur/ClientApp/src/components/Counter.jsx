import React, { Component } from 'react';
import { setCounter } from '../actionCreators/simpleActionCreators'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Counter extends Component {
  static displayName = Counter.name;

  static propTypes = {
    currentCount: PropTypes.number.isRequired,
    setCounter: PropTypes.func.isRequired,
  };

  render() {
    const { currentCount, setCounter } = this.props;

    return (
      <>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>
        <p>Current count: <strong>{currentCount}</strong></p>
        <button className="bg-decathlon shadow-4 hover-bg-success white br3 pv3 ph6 pointer bn no-outline" onClick={() => setCounter(this.props.currentCount + 1)}>Increment</button>
      </>
    );
  }
}


function mapStateToProps(state) {
  return {
    currentCount: state.simple.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCounter: bindActionCreators(setCounter, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);


