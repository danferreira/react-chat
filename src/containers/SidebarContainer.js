import React from 'react';
import { connect } from 'react-redux';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import { Link } from "react-router-dom";

import UserAvatar from '../components/Avatar/UserAvatar/UserAvatar';
import Sidebar from '../components/Sidebar/Sidebar';
import SidebarHeader from '../components/Sidebar/SidebarHeader/SidebarHeader';
import ContactListContainer from './ContactListContainer';

const SidebarContainer = ({ user }) => {
    console.log(user);
    return (
        <Sidebar>
            <SidebarHeader>
                <UserAvatar />

                <Dropdown>
                    <DropdownTrigger>
                        <span className="username">{user.name}</span>
                        {/* <div><i class="fas fa-ellipsis-v"></i></div> */}
                    </DropdownTrigger>

                    <DropdownContent>
                        <ul>
                            <li><Link to="/profile"><div>Profile</div></Link></li>
                            <li><Link to="/signout"><div>Sign Out</div></Link></li>
                        </ul>
                    </DropdownContent>
                </Dropdown>
            </SidebarHeader>

            <ContactListContainer />
        </Sidebar>
    );
}

export default connect(state => ({ user: state.user }), null)(SidebarContainer);