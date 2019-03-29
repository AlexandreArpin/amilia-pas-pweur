import React, { Component } from 'react';
import { Input, Button } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notifyMe, reset } from '../../actionCreators/sweatActionCreator'

class NotifyMePart extends Component {

    static propTypes = {
        sport: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        success: PropTypes.bool.isRequired,
        notifyMe: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    };

    render() {
        const { sport, location, email, success } = this.props;

        return (
            <div>
                <h1>Sorry bro</h1>
                <Input fluid placeholder='Email'>
                    <input />
                </Input>
                <div className="mt4">
                    <Button primary onClick={() => this.props.notifyMe(sport, location, email)}>Notify Me</Button>
                    <Button basic onClick={this.props.reset}>Start Again</Button>

                </div>
                {success && <h1>GREAT SUCCESS YOU'RE ARE GOING TO BE NOTIFIED</h1>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sport: state.sweat.query.sport,
        location: state.sweat.query.location,
        email: state.sweat.notify.email,
        success: state.sweat.notify.success
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notifyMe: bindActionCreators(notifyMe, dispatch),
        reset: bindActionCreators(reset, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifyMePart);