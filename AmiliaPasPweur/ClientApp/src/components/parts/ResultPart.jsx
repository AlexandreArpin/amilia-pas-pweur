import React, { Component } from 'react';
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

  render() {
    const { results } = this.props;
    console.log(results);
    return (
        <>
      <div className="sorry image-holder"></div>
      <div className="bg-yellowgram pv8">
        <div className="center mw7">
            <h1 className="ma0 pa0 mb4">Congrats! Here are some results</h1>
            <div className="bg-white shadow-4 pa6 br3">
                <h2 className="pa0 ma0 f4">{results[0].location.fullName}</h2>
                <p className="pa0 ma0 f7">{results[0].location.address.address1} {results[0].location.address.address2}, {results[0].location.address.city} - {results[0].location.telephone}</p>
                <em>{results[0].location.description}</em>
            </div>
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