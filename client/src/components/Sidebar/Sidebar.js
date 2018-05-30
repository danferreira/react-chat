import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Sidebar.css';

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
            <div className="sidebar-container">
                <div
                    className={classNames({
                        'sidebar': true,
                        'sidebar-docked': this.state.docked
                    })}>
                    {children}
                </div>
                {this.state.docked &&
                    <div
                        className="burger"
                        onClick={this.handleDockSidebar}>☰</div>
                }
                {showOverlay &&
                    <div
                        className="overlay"
                        onClick={this.handleDockSidebar}>
                    </div>
                }
            </div>

        );
    }

}

Sidebar.propTypes = propTypes;

export default Sidebar;