import React, { Component } from 'react';
import { Dropdown, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendQuery, fetchAvailableSports } from '../../actionCreators/sweatActionCreator'
import { bindActionCreators } from "redux";
import Geosuggest from 'react-geosuggest';

class QueryPart extends Component {

  static propTypes = {
    sport: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    sendQuery: PropTypes.func.isRequired,
    availableSports: PropTypes.array.isRequired,
    fetchAvailableSports: PropTypes.func.isRequired,
    areAvailableSportsFetched: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    if(!this.props.areAvailableSportsFetched){
      this.props.fetchAvailableSports()
    }
  }

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

    const { sport, location, availableSports } = this.props;
    console.log("Available Sports", availableSports);


    // eslint-disable-next-line no-undef
    const longLat = new google.maps.LatLng(45.5017, 73.5673);

    return (
      <div>
        <Dropdown
          button
          className='icon'
          floating
          labeled
          icon='soccer'
          options={languageOptions}
          search
          text='Select sport'
        />

        <Button primary onClick={() => this.props.sendQuery(this.props.sendQuery(sport, location))}>Next</Button>

        <Geosuggest location={longLat} radius={500000} country={"CA"} onSuggestSelect={this.onSuggestSelect} />
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
    location: state.sweat.query.location,
    availableSports: state.sweat.availableSports.sports
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendQuery: bindActionCreators(sendQuery, dispatch),
    fetchAvailableSports: bindActionCreators(fetchAvailableSports, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryPart);
