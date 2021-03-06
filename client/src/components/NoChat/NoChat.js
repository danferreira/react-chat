import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo/Logo';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`;

const NoChat = () => (
    <Wrapper>
        <Logo />
    </Wrapper>
);

export default NoChat;