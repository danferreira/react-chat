import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
    z-index: 2;
    position: absolute;
    background: #fff;
    width: 300px;
    height: 100vh;
    transition: transform 0.3s ease-out;
    transform: ${props => props.docked ? 'translateX(-100%)' : 'translateX(0%)'};

    @media screen and (min-width: 993px) {
        position: relative;
        width: 400px;
    }
`;

const Burger = styled.div`
    text-decoration: none;
    color: #fff;
    left: 10px;
    top: 10px;
    font-size: 1.5em;
    position: fixed;
    cursor: pointer;
`;

const Overlay = styled.div`
    z-index: 1;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
    background-color: rgba(0, 0, 0, 0.3);
`;


const propTypes = {
    children: PropTypes.node.isRequired
};

const mql = window.matchMedia(`(min-width: 993px)`);

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = { docked: false }
    }

    componentDidMount() {
        mql.addListener(this.mediaQueryChanged);
        this.mediaQueryChanged();
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged = () => {
        this.setSidebarDocked(!mql.matches);
    }

    handleDockSidebar = () => {
        this.setSidebarDocked(!this.state.docked);
    }

    setSidebarDocked = (value) => this.setState({ docked: value });

    render() {
        const { children } = this.props;
        const showOverlay = !this.state.docked && !mql.matches;

        return (
            <div>
                <SidebarWrapper docked={this.state.docked}>
                    {children}
                </SidebarWrapper>
                {this.state.docked && <Burger onClick={this.handleDockSidebar}>☰</Burger>}
                {showOverlay && <Overlay onClick={this.handleDockSidebar} />}
            </div>

        );
    }

}

Sidebar.propTypes = propTypes;

export default Sidebar;