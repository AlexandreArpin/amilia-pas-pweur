import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAdminData } from '../actionCreators/adminActionCreator'
import { bindActionCreators } from "redux";
import LoadingPart from './parts/LoadingPart'
import { Table } from 'semantic-ui-react'

class Admin extends Component {
  static propTypes = {
    fetchAdminData: PropTypes.func.isRequired,
    isFetched: PropTypes.bool.isRequired,
    queries: PropTypes.array.isRequired,
    notifications: PropTypes.array.isRequired,
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
    const { queries, notifications, isFetched } = this.props;

    console.log(this.props);
    return (
      <div>
        <h1>Administration</h1>
        {!isFetched && <LoadingPart />}
        {isFetched &&
          <>
            <h2>Notifications</h2>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Sport</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell>Count</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {notifications.map(this.renderBodyRow)}
              </Table.Body>
            </Table>

            <h2>Queries</h2>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Sport</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell>Count</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {queries.map(this.renderBodyRow)}
              </Table.Body>
            </Table>
          </>
        }
      </div>
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
