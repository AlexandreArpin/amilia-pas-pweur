import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAdminData } from '../actionCreators/adminActionCreator'
import { bindActionCreators } from "redux";
import LoadingPart from './parts/LoadingPart'
import { Header, Table, Rating } from 'semantic-ui-react'

class Admin extends Component {
  static propTypes = {
    fetchAdminData: PropTypes.func.isRequired,
    isFetched: PropTypes.bool.isRequired,
    queries: PropTypes.array.isRequired,
    notifications: PropTypes.array.isRequired,
  };

  componentDidMount() {
    if (!this.props.areAvailableSportsFetched) {
      this.props.fetchAvailableSports()
    }
  }

  render() {
    const { queries, notifications, isFetched } = this.props;

    return (
      <div>
        <h1>AdminPage!!</h1>
        {!isFetched && <LoadingPart />}
        <h2>Notifications</h2>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
              <Table.HeaderCell>Effect</Table.HeaderCell>
              <Table.HeaderCell>Efficacy</Table.HeaderCell>
              <Table.HeaderCell>Consensus</Table.HeaderCell>
              <Table.HeaderCell>Comments</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as='h2' textAlign='center'>
                  A
          </Header>
              </Table.Cell>
              <Table.Cell singleLine>Power Output</Table.Cell>
              <Table.Cell>
                <Rating icon='star' defaultRating={3} maxRating={3} />
              </Table.Cell>
              <Table.Cell textAlign='right'>
                80% <br />
                <a href='#'>18 studies</a>
              </Table.Cell>
              <Table.Cell>
                Creatine supplementation is the reference compound for increasing muscular creatine
                levels; there is variability in this increase, however, with some nonresponders.
        </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h2' textAlign='center'>
                  A
          </Header>
              </Table.Cell>
              <Table.Cell singleLine>Weight</Table.Cell>
              <Table.Cell>
                <Rating icon='star' defaultRating={3} maxRating={3} />
              </Table.Cell>
              <Table.Cell textAlign='right'>
                100% <br />
                <a href='#'>65 studies</a>
              </Table.Cell>
              <Table.Cell>
                Creatine is the reference compound for power improvement, with numbers from one
                meta-analysis to assess potency
        </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
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
