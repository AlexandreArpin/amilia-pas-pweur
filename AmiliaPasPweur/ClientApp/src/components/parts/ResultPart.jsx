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

    return (
      <div>
        <h1>Congrats! Here are some results</h1>

        <p>{results[0].fullName} - {results[0].telephone}</p>

        <div>
          <Button basic onClick={this.props.reset}>Start Again</Button>
        </div>
      </div>
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