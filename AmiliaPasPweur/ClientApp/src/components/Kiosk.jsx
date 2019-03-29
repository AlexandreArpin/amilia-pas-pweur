import React, { Component } from 'react';
import LoadingPart from './parts/LoadingPart'
import { Button } from "semantic-ui-react";
import ResultPart from './parts/ResultPart'
import NotifyMePart from './parts/NotifyMePart'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { sendQuery, fetchAvailableSports, reset } from '../actionCreators/sweatActionCreator'

import PropTypes from "prop-types";

class Kiosk extends Component {

  static propTypes = {
    step: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    sendQuery: PropTypes.func.isRequired,
    availableSports: PropTypes.array.isRequired,
    fetchAvailableSports: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    areAvailableSportsFetched: PropTypes.bool.isRequired,
  };

  onComponentDidMount(){
    this.props.reset();

    if(!this.props.areAvailableSportsFetched){
      this.props.fetchAvailableSports()
    }
  }

  render () {
    const { step, isLoading } = this.props;
    return (
      <>
        { isLoading && <LoadingPart /> }
        { (!isLoading && step === 0) && 
        <>
          <Button onClick={() => this.props.sendQuery(57, { lat: 45.54, lng: -73.65})}>Yoga</Button>
          <Button onClick={() => this.props.sendQuery(77, { lat: 45.54, lng: -73.65})}>Hockey</Button>
        </>
        }
        { (!isLoading && step === 1) && <ResultPart />}
        { (!isLoading && step === 2) && <NotifyMePart />}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    step: state.sweat.step,
    isLoading: state.sweat.isLoading,
    availableSports: state.sweat.availableSports.sports,
    areAvailableSportsFetched: state.sweat.availableSports.isFetched,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendQuery: bindActionCreators(sendQuery, dispatch),
    fetchAvailableSports: bindActionCreators(fetchAvailableSports, dispatch),
    reset: bindActionCreators(reset, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Kiosk);
