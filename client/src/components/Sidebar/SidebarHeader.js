import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled.header`
    border-bottom: 1px solid #cdcfd2;
    padding: 10px;
    display: flex;
    align-items: center;
    height: 70px;
`;

const propTypes = {
    children: PropTypes.node
}

const SidebarHeader = ({ children }) => (
    <Header>
       {children}
    </Header>
);

SidebarHeader.propTypes = propTypes;

export default SidebarHeader;

