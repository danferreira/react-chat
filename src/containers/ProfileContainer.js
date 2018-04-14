import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../components/Loader/Loader';
import firebase from '../firebase'
import Profile from '../components/Profile/Profile';
import { sendProfileMessage } from '../actions/chatActions';

class ProfileContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.uid;

        firebase.database().ref("/users/" + userId).once("value").then(snapshot => {
            if(!snapshot.val()) 
                this.props.history.push("/home");;

            this.setState(prevState => ({
                user: {
                    id: snapshot.key,
                    name: snapshot.val().name,
                    avatar: snapshot.val().avatar,
                    bio: snapshot.val().bio
                },
                isLoading: false
            }));
        });
    }

    render() {
        return (
            <Loader isLoading={this.state.isLoading}>
                <Profile user={this.state.user} onSendMessage={this.props.sendProfileMessage} />                
            </Loader>
        );
    }
}

var mapDispatchToProps = {
    sendProfileMessage
}

export default withRouter(connect(null, mapDispatchToProps)(ProfileContainer));