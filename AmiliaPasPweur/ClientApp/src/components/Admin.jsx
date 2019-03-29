import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAdminData } from '../actionCreators/adminActionCreator'
import { bindActionCreators } from "redux";
import LoadingPart from './parts/LoadingPart'
import { Table } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'

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
  };

  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.fetchAdminData()
    }
  }

  renderBodyRow(query) {
    return (
      <Table.Row key={query.sport}>
        <Table.Cell>{query.sport}</Table.Cell>
        <Table.Cell>{query.location.lat} | {query.location.lng}</Table.Cell>
        <Table.Cell>{query.count}</Table.Cell>
      </Table.Row>);
  }

  render() {
    const { queries, isFetched } = this.props;

    const heatMapData = {
      positions: queries.filter(x => x.sport === 2).map(x => ({ lat: x.location.lat, lng: x.location.lng })),
      options: {
        radius: 20,
        opacity: 0.7,
      }
    };

    const apiKey = {key: 'AIzaSyADZ6SKjElEyIdZ7og8PzLEBZ6zLOAtPz8'}

    return (
      <div>
        <h1>Administration</h1>
        {!isFetched && <LoadingPart />}
        {
          isFetched &&
          <>
            <div style={{ height: '75vh', width: '100%' }}>
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
}

function mapStateToProps(state) {
  return {
    isFetched: state.admin.isFetched,
    queries: state.admin.queries,
    notifications: state.admin.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAdminData: bindActionCreators(fetchAdminData, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
