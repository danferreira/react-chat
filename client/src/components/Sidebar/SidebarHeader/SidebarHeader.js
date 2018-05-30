import React from 'react';
import PropTypes from 'prop-types';

import './SidebarHeader.css';

const propTypes = {
    children: PropTypes.node
}

const SidebarHeader = ({ children }) => (
    <header className="sidebar-header">
       {children}
    </header>
);

SidebarHeader.propTypes = propTypes;

export default SidebarHeader;

