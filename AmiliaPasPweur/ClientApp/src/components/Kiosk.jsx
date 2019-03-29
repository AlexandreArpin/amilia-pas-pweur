import React, { Component } from 'react';
import logo from '../assets/logo.png';
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
            <div className="image-holder home relative">
                <div className="center mw5">
                    <div className="logo-main">
                        <img src={logo} alt="" />
                    </div>
                </div>
            </div>
          <div className="mw7 center">
            <div className="flex flex-wrap">
                <div className="w-33">
                    <img src="https://png.pngtree.com/svg/20150707/6da03e899e.png" onClick={() => this.props.sendQuery(174, { lat: 45.54, lng: -73.65 })} className="pointer" />
                </div>
                <div className="w-33">
                    <img src="https://static.thenounproject.com/png/39414-200.png" onClick={() => this.props.sendQuery(53, { lat: 45.54, lng: -73.65 })} className="pointer"/>
                </div>
                <div className="w-33">
                    <img src="https://www.shareicon.net/data/2016/02/19/721572_sport_512x512.png" onClick={() => this.props.sendQuery(1, { lat: 45.54, lng: -73.65 })} className="pointer" />
                </div>
            </div>
                <div className="flex flex-wrap mt10">
                <div className="w-33">
                    <img src="https://static.thenounproject.com/png/43133-200.png" onClick={() => this.props.sendQuery(19, { lat: 45.54, lng: -73.65 })} className="pointer" />
                </div>
                <div className="w-33">
                    <img src="http://cdn.onlinewebfonts.com/svg/img_531220.png" onClick={() => this.props.sendQuery(10, { lat: 45.54, lng: -73.65 })} className="pointer" />
                </div>
                <div className="w-33">
                    <img src="http://simpleicon.com/wp-content/uploads/tennis.png" onClick={() => this.props.sendQuery(78, { lat: 45.54, lng: -73.65 })} className="pointer" />
                </div>
            </div>
          </div>
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
