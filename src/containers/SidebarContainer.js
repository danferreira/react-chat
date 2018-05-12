import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import { Link } from "react-router-dom";

import Avatar from '../components/Avatar/Avatar';
import Sidebar from '../components/Sidebar/Sidebar';
import SidebarHeader from '../components/Sidebar/SidebarHeader/SidebarHeader';
import ContactListContainer from './ContactListContainer';
import SidebarPanel from '../components/Sidebar/SidebarPanel/SidebarPanel';

class SidebarContainer extends Component {
    constructor(props) {
        super(props);

        this.state = { settingsIsOpen: false }
    }

    onSettings = () => {
        this.setState(prevState => ({ settingsIsOpen: !prevState.settingsIsOpen }));
    }

    render() {
        const { user } = this.props;

        return (
            <Sidebar>
                <SidebarHeader>
                    <Avatar
                        size='medium'
                        rounded
                    />

                    <Dropdown>
                        <DropdownTrigger>
                            <span className="username">{user.name}</span>
                        </DropdownTrigger>

                        <DropdownContent>
                            <ul>
                                <li><div onClick={this.onSettings}>Settings</div></li>
                                <li><Link to="/signout"><div>Sign Out</div></Link></li>
                            </ul>
                        </DropdownContent>
                    </Dropdown>
                </SidebarHeader>
                <ContactListContainer />

                <SidebarPanel title="Settings" onClose={this.onSettings} isOpen={this.state.settingsIsOpen}>

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

export default connect(mapStateToProps, null)(SidebarContainer);