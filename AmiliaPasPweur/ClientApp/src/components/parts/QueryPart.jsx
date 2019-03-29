import React, { Component } from 'react';
import { Dropdown, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendQuery, fetchAvailableSports } from '../../actionCreators/sweatActionCreator'
import { bindActionCreators } from "redux";
import Geosuggest from 'react-geosuggest';

class QueryPart extends Component {
  static propTypes = {
    sendQuery: PropTypes.func.isRequired,
    availableSports: PropTypes.array.isRequired,
    fetchAvailableSports: PropTypes.func.isRequired,
    areAvailableSportsFetched: PropTypes.bool.isRequired,
  };

  state = {
    selectedSport: null,
    selectedLocation: null
  }

  componentDidMount() {
    if(!this.props.areAvailableSportsFetched){
      this.props.fetchAvailableSports()
    }
  }

  render() {
    const { availableSports } = this.props;

    const sportsOptions = availableSports.map(x => ({ key: x.id, text: x.name, value: x.id}));

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
          options={sportsOptions}
          search
          text='Select sport'
          onChange={(event, data) => this.onSportSelect(data.value)}
        />

        <Button primary onClick={this.sendQuery}>Next</Button>

        <Geosuggest location={longLat} radius={500000} country={"CA"} onSuggestSelect={this.onSuggestSelect} />
      </div>
    );
  }

  onSportSelect = (value) => {
    if(value) {
      this.setState({ selectedSport: value})
    }
  }

  onSuggestSelect = (suggest) => {
    if(suggest) {
      this.setState({ selectedLocation: suggest.location})
    }
  }

  sendQuery = () => {
    if(this.state.selectedSport && this.state.selectedLocation) {
      this.props.sendQuery(this.state.selectedSport, this.state.selectedLocation);
    }
  }
}

function mapStateToProps(state) {
  return {
    availableSports: state.sweat.availableSports.sports,
    areAvailableSportsFetched: state.sweat.availableSports.isFetched,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendQuery: bindActionCreators(sendQuery, dispatch),
    fetchAvailableSports: bindActionCreators(fetchAvailableSports, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryPart);
