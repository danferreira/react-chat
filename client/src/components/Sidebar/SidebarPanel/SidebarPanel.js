import React from 'react';
import classNames from 'classnames';

import './SidebarPanel.css';

const SidebarPanel = ({ title, isOpen, children, onClose }) => {

    const handleOnClick = () => {
        onClose();
    }

    return (
        <div className={classNames({
            'sidebar-panel': true,
            'sidebar-panel-opened': isOpen
        })}>
            <header className="sidebar-panel-header">
                <div className="back" onClick={handleOnClick}>
                    <i className="fas fa-long-arrow-alt-left"></i>
                </div>
                <div className="title">
                    {title}
                </div>
            </header>
            {children}
        </div>
    );
}

export default SidebarPanel;
