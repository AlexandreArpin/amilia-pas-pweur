import { Button, Input } from "semantic-ui-react";
import React, { Component } from 'react';
import { notifyMe, reset } from '../../actionCreators/sweatActionCreator'

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class NotifyMePart extends Component {

    static propTypes = {
        // sport: PropTypes.string.isRequired,
        // location: PropTypes.string.isRequired,
        success: PropTypes.bool.isRequired,
        notifyMe: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    };

    state = {
        canNotify: false
      }

    render() {
        const { success } = this.props;

        const notifyEnabled = this.state.canNotify;

        return (
            <>
            <div className="sorry image-holder"></div>
            <div className="pv8 flex flex-column justify-center bg-yellowgram">
                <div className="center flex flex-column w-100 mw7">
                    <h1>Sorry bro</h1>
                    <Input fluid placeholder='Email'>
                        <input onChange={(event) => {
                            this.onEmailChanged(event.target.value)
                        }}/>
                    </Input>
                    <div className="mt4 flex">
                        <div className="mr4">
                            <Button disabled={!notifyEnabled} onClick={() => this.notifyMe()}>Notify Me</Button>
                        </div>
                        <Button basic onClick={this.props.reset}>Start Again</Button>
                    </div>
                    {success && <h1>GREAT SUCCESS YOU'RE ARE GOING TO BE NOTIFIED</h1>}
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
        if(this.validateEmail(value)) {
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
        if(this.state.email) {
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