import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import styled from 'styled-components';
import Spinner from '../components/Spinner/Spinner'

import ProfileCard from '../components/ProfileCard/ProfileCard';

const UserList = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin-top: 50px;
`;

const Error = styled.div`
    color: red;
    font-size: 20px;
    margin:20px;
`;

const UserListContainer = () => {

    return (
        <Query query={GET_ALL_USERS}>
            {({ loading, error, data }) => {
                if (loading) return <Spinner />
                if (error) return <Error>{`Error! ${error.message}`}</Error>;

                return (
                    <UserList>
                        {data.users.map(c => <ProfileCard contact={c} key={c.id}/>)}
                    </UserList>
                )
            }}

        </Query>
    );
}

const GET_ALL_USERS = gql`
    query {
        users: getAllUsers {
            id
            email
        }
    }
`;

export default UserListContainer;