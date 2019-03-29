import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import { bindActionCreators } from "redux";
import { reset } from '../../actionCreators/sweatActionCreator'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

class ResultPart extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    reset: PropTypes.func.isRequired,
  };

  renderActivity(result) {
    const myDate = result.activities[0].StartDate;
    const date = myDate.slice(0, 10);
    return <div className="bg-white shadow-4 pa6 br3 mb4">
    <h2 className="pa0 ma0 f4">{result.location.fullName}</h2>
    <p className="pa0 ma0 f7">{result.location.address.address1} {result.location.address.address2}, {result.location.address.city} - {result.location.telephone}</p>
    <em>{result.location.description}</em>
    <hr></hr>
    <div className="flex mt4">
        <div className="w-20 mr6">
            <img src={result.activities[0].PictureUrl} alt="" />
        </div>
        <div>
            <p className="pa0 ma0 mb1"><strong>Start Date: {date}</strong>{}</p>
            <p className="pa0 ma0"><strong>Schedule: </strong>{result.activities[0].ScheduleSummary}</p>
            <a className="no-underline decathlon mt1 dib" href={result.activities[0].Url}>Visit</a>
        </div>
    </div>
</div>
  }

  render() {
    const { results } = this.props;
    console.log(results);



    return (
      <>
      <div className="sorry image-holder relative">
        <div className="center mw5">
            <div className="logo-main">
                <img src={logo} alt="" />
            </div>
        </div>
        </div>
      <div className="bg-yellowgram pv8">
        <div className="center mw7">
            <h1 className="ma0 pa0 mb4">Awesome, we found some activities!</h1>
            {results.slice(0, 3).map(this.renderActivity)}
            <div className="mt4">
                <Button basic onClick={this.props.reset}>Start Again</Button>
            </div>
        </div>
      </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.sweat.results,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: bindActionCreators(reset, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultPart);