import React, { Component } from 'react';
import { Button, Dropdown } from "semantic-ui-react";
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
      <>
        <div className="image-holder">
        </div>
        <div className="bg-yellowgram pv4 flex flex-column justify-center">
            <div className="mw7 flex w-100 center">
                <div className="w-50 pr3">
                    <div className="flex">
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
                    </div>
                </div>
                <div className="w-50 pl3">
                    <div className="">
                        <Geosuggest location={longLat} radius={500000} country={"CA"} onSuggestSelect={this.onSuggestSelect} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt4">
                <Button basic onClick={this.sendQuery}>Next</Button>
            </div>
        </div>
      </>
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
