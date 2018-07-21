import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import Logo from '../../components/Logo/Logo';
import UserListContainer from '../../containers/UserListContainer';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Section = styled.section`
    margin-top: 30px;
    font-size: 30px;
    color: white;
`;

const Info = styled.div`
    font-size: 30px;
    color: white;
    a {
        color: white;
    }
`;

const IndexPage = () =>
    <Main>
        <Section>
            <h3>React-Chat</h3>
            <Logo />
        </Section>
        <Info>
            <label>Go to <Link to="/home">Home</Link>, <Link to="/login">Login</Link> or <Link to="/register">Register</Link> page.</label>
        </Info>
        <UserListContainer />
    </Main>

export default IndexPage;