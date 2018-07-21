import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

const SidebarPanelWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;
    background: #fff;
    transition: transform 0.4s ease-out;
    border-right: 1px solid #cdcfd2;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
`;

const SidebarPanelHeader = styled.div`
    border-bottom: 1px solid #cdcfd2;
    padding: 20px;
    display: flex;
    align-items: center;
    background: #4299b1;
    color: white;    
    height: 70px;
`;

const BackButton = styled.div`
    flex: 1;
    font-size: 30px;
    cursor: pointer;
`;

const Title = styled.h4`
    flex: 5;
    font-size: 21px;
`

const SidebarPanel = ({ title, isOpen, children, onClose }) => {

    const handleOnClick = () => {
        onClose();
    }

    return (
        <SidebarPanelWrapper isOpen={isOpen}>
            <SidebarPanelHeader>
                <BackButton onClick={handleOnClick}>
                    <FontAwesomeIcon icon={ faLongArrowAltLeft } />
                </BackButton>
                <Title>{title}</Title>
            </SidebarPanelHeader>
            {children}
        </SidebarPanelWrapper>
    );
}

export default SidebarPanel;
