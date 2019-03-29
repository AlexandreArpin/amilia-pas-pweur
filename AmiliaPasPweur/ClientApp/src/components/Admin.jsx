/* global google */

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAdminData } from '../actionCreators/adminActionCreator'
import { fetchAvailableSports } from '../actionCreators/sweatActionCreator'
import { bindActionCreators } from "redux";
import LoadingPart from './parts/LoadingPart'
import GoogleMapReact from 'google-map-react'
import { Dropdown } from "semantic-ui-react";

class Admin extends Component {
  static defaultProps = {
    center: {
      lat: 45.54,
      lng: -73.65
    },
    zoom: 14
  }

  static propTypes = {
    fetchAdminData: PropTypes.func.isRequired,
    isFetched: PropTypes.bool.isRequired,
    queries: PropTypes.array.isRequired,
    notifications: PropTypes.array.isRequired,
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    fetchAvailableSports: PropTypes.func.isRequired,
    areAvailableSportsFetched: PropTypes.bool.isRequired,
  };

  state = {
    selectedSport: null,
  }

  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.fetchAdminData()
    }

    if (!this.props.areAvailableSportsFetched) {
      this.props.fetchAvailableSports()
    }
  }

  render() {
    const { queries, isFetched, availableSports } = this.props;

    const sportsContainedInQueries = Array.from(new Set(queries.map(x => x.sport)));

    const sportsOptions = availableSports
      .filter(x => sportsContainedInQueries.find(y => y === x.id))
      .map(x => ({ key: x.id, text: x.name, value: x.id }))
      .sort(function (a, b) {
        var nameA = a.text.toUpperCase(); // ignore upper and lowercase
        var nameB = b.text.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });


    const heatMapData = {
      positions: queries.filter(x => x.sport === this.state.selectedSport).map(x => ({ lat: x.location.lat, lng: x.location.lng })),
      options: {
        radius: 20,
        opacity: 0.7,
      }
    };

    if (this._googleMap !== undefined) {
      this._googleMap.heatmap.setData(heatMapData.positions.map(x => new google.maps.LatLng(x.lat, x.lng)));
    }

    const apiKey = { key: 'AIzaSyADZ6SKjElEyIdZ7og8PzLEBZ6zLOAtPz8' }

    return (
      <div className="mw8 center">
        <h1>Administration</h1>
        <div className="flex">
          <Dropdown
            options={sportsOptions}
            selection
            search
            placeholder='Select Activity'
            onChange={(event, data) => this.onSportSelect(data.value)}
          />
        </div>
        {!isFetched && <LoadingPart />}
        {
          isFetched &&
          <>
            <div className="mt6" style={{ height: '75vh', width: '100%' }}>
              <GoogleMapReact
                ref={(el) => this._googleMap = el}
                bootstrapURLKeys={apiKey}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                heatmapLibrary={true}
                heatmap={heatMapData}
              ></GoogleMapReact>
            </div>

          </>
        }
      </div >
    );
  }

  onSportSelect = (value) => {
    if (value) {
      console.debug("Selected Sport", value)
      this.setState({ selectedSport: value })
    }
  }
}

function mapStateToProps(state) {
  return {
    isFetched: state.admin.isFetched,
    queries: state.admin.queries,
    notifications: state.admin.notifications,
    availableSports: state.sweat.availableSports.sports,
    areAvailableSportsFetched: state.sweat.availableSports.isFetched,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAdminData: bindActionCreators(fetchAdminData, dispatch),
    fetchAvailableSports: bindActionCreators(fetchAvailableSports, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
