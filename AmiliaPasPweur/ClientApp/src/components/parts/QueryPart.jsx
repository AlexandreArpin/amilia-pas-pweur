import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendQuery } from '../../actionCreators/sweatActionCreator'
import { bindActionCreators } from "redux";
import Geosuggest from 'react-geosuggest';

class QueryPart extends Component {

  static propTypes = {
    sport: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    sendQuery: PropTypes.func.isRequired,
  };

  render() {
    const languageOptions = [
      { key: 'Arabic', text: 'Arabic', value: 'Arabic' },
      { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
      { key: 'Danish', text: 'Danish', value: 'Danish' },
      { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
      { key: 'English', text: 'English', value: 'English' },
      { key: 'French', text: 'French', value: 'French' },
      { key: 'German', text: 'German', value: 'German' },
      { key: 'Greek', text: 'Greek', value: 'Greek' },
      { key: 'Hungarian', text: 'Hungarian', value: 'Hungarian' },
      { key: 'Italian', text: 'Italian', value: 'Italian' },
      { key: 'Japanese', text: 'Japanese', value: 'Japanese' },
      { key: 'Korean', text: 'Korean', value: 'Korean' },
      { key: 'Lithuanian', text: 'Lithuanian', value: 'Lithuanian' },
      { key: 'Persian', text: 'Persian', value: 'Persian' },
      { key: 'Polish', text: 'Polish', value: 'Polish' },
      { key: 'Portuguese', text: 'Portuguese', value: 'Portuguese' },
      { key: 'Russian', text: 'Russian', value: 'Russian' },
      { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
      { key: 'Swedish', text: 'Swedish', value: 'Swedish' },
      { key: 'Turkish', text: 'Turkish', value: 'Turkish' },
      { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
    ]

    const { sport, location } = this.props;
    // eslint-disable-next-line no-undef
    const longLat = new google.maps.LatLng(45.5017, 73.5673);

    return (
      <div className="">
        <div className="image-holder">
        </div>
        <div className="bg-yellowgram pv4">
            <div className="mw7 flex center">
                <div className="w-50 pr3">
                    <div className="flex">
                        <Dropdown
                            placeholder='Select Activity'
                            fluid
                            selection
                            options={languageOptions}
                        />
                    </div>
                </div>
                <div className="w-50 pl3">
                    <div className="">
                        <Geosuggest location={longLat} radius={500000} country={"CA"} onSuggestSelect={this.onSuggestSelect} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  onSuggestSelect(suggest) {
    console.log(suggest);
  }
}

function mapStateToProps(state) {
  return {
    sport: state.sweat.query.sport,
    location: state.sweat.query.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendQuery: bindActionCreators(sendQuery, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryPart);
