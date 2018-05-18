import React from 'react';
import { Link } from "react-router-dom";
import './IndexPage.css';

const IndexPage = () =>
    <div className="index">
        <label>Go to <Link to="/home">Home</Link> or <Link to="/register">Register</Link> page.</label>
    </div>

export default IndexPage;