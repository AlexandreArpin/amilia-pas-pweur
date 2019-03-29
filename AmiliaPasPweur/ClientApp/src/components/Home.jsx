import React, { Component } from 'react';
import LoadingPart from './parts/LoadingPart'
import QueryPart from './parts/QueryPart'
import ResultPart from './parts/ResultPart'
import NotifyMePart from './parts/NotifyMePart'
import { connect } from "react-redux";

import PropTypes from "prop-types";

class Home extends Component {

  static propTypes = {
    step: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired
  };


  render () {

    const { step, isLoading } = this.props;
    return (
      <>
        { isLoading && <LoadingPart /> }
        { (!isLoading && step === 0) && <QueryPart />}
        { step === 1 && <ResultPart />}
        { step === 2 && <NotifyMePart />}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    step: state.sweat.step,
    isLoading: state.sweat.isLoading
  };
}

export default connect(mapStateToProps, undefined)(Home);
