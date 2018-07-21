import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Avatar from '../components/Avatar/Avatar';
import Sidebar from '../components/Sidebar/Sidebar';
import SidebarHeader from '../components/Sidebar/SidebarHeader';
import SidebarPanel from '../components/Sidebar/SidebarPanel';
import ContactListContainer from './ContactListContainer';

const UserName = styled.label`
    flex: 1;
    margin: 25px;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
`;


class SidebarContainer extends Component {
    state = {
        settingsIsOpen: false,
        anchorEl: null
    }

    onSettings = () => {
        this.setState(prevState => ({ 
            settingsIsOpen: !prevState.settingsIsOpen,
            anchorEl: null, 
        }));
    }

    onSignOut = () => {
        this.props.history.push('/signout');
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { user } = this.props;
        const { settingsIsOpen, anchorEl } = this.state;

        return (
            <Sidebar>
                <SidebarHeader>
                    <Avatar
                        size='medium'
                        rounded
                    />
                    <UserName
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        {user.name}
                    </UserName>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        onClose={this.handleClose}>
                        <MenuItem onClick={this.onSettings}>Settings</MenuItem>
                        <MenuItem onClick={this.onSignOut}>Logout</MenuItem>
                    </Menu>

                </SidebarHeader>
                <ContactListContainer />
                <SidebarPanel
                    title="Settings"
                    onClose={this.onSettings}
                    isOpen={settingsIsOpen}>
                </SidebarPanel>

            </Sidebar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, null)(SidebarContainer));