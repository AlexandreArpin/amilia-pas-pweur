import { Button, Input } from "semantic-ui-react";
import React, { Component } from 'react';
import { notifyMe, reset } from '../../actionCreators/sweatActionCreator'

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class NotifyMePart extends Component {

    static propTypes = {
        success: PropTypes.bool.isRequired,
        notifyMe: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    };

    state = {
        canNotify: false
    }

    constructor(props) {
        super(props);
        const min = Math.ceil(8);
        const max = Math.floor(42);
        const randomNumber = Math.floor(Math.random() * (max - min)) + min;

        this.state = {
            canNotify: false,
            randomNumber: randomNumber
        }
    }

    render() {
        const { success } = this.props;

        const notifyEnabled = this.state.canNotify;

        return (
            <>
                <div className="sorry image-holder"></div>
                <div className="pv8 flex flex-column justify-center bg-yellowgram">
                    <div className="center flex flex-column w-100 mw7">
                        <h1>We're sorry that this activity isn't available near you.</h1>
                        {success &&
                            <>
                                <h1>Thanks for subscribing! We'll notify you asap!</h1>

                                <div className="mt4 flex">
                                    <div className="mr4">
                                        <Button disabled={!notifyEnabled} onClick={() => this.notifyMe()}>Notify Me</Button>
                                    </div>
                                    <Button basic onClick={this.props.reset}>Start Again</Button>
                                </div>
                            </>
                        }
                        {!success &&
                            <>
                                <h2>You and {this.state.randomNumber} of persons in your area share the same interested. Want to get notified when it becomes available?</h2>
                                <Input fluid placeholder='Email'>
                                    <input onChange={(event) => {
                                        this.onEmailChanged(event.target.value)
                                    }} />
                                </Input>
                                <div className="mt4 flex">
                                    <div className="mr4">
                                        <Button disabled={!notifyEnabled} onClick={() => this.notifyMe()}>Notify Me</Button>
                                    </div>
                                    <Button basic onClick={this.props.reset}>Start Again</Button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </>
        );
    }

    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onEmailChanged = (value) => {
        if (this.validateEmail(value)) {
            this.setState({
                email: value,
                canNotify: true,
            })
        }
        else {
            this.setState({
                canNotify: false,
            })
        }
    }

    notifyMe = () => {
        if (this.state.email) {
            this.props.notifyMe(this.props.sport, this.props.location, this.state.email);
        }
    }
}

function mapStateToProps(state) {
    return {
        sport: state.sweat.query.sport,
        location: state.sweat.query.location,
        success: state.sweat.notify.success,
        canNotify: state.canNotify,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notifyMe: bindActionCreators(notifyMe, dispatch),
        reset: bindActionCreators(reset, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifyMePart);