import React from 'react';
import { Link } from "react-router-dom";

import Logo from '../../images/logo.svg';
import './IndexPage.css';
import UserListContainer from '../../containers/UserListContainer';

const IndexPage = () =>
    <div className="main">
        <label className="title">React-Chat</label>
        <div className="logo">
            <img src={Logo} alt="Logo" />
        </div>
        <div className="block-desc">
            <label className="desc">Go to <Link to="/home">Home</Link>, <Link to="/login">Login</Link> or <Link to="/register">Register</Link> page.</label>
        </div>
        <UserListContainer />
    </div>

export default IndexPage;