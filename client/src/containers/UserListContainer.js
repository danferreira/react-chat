import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import styled from 'styled-components';

import ProfileCard from '../components/ProfileCard/ProfileCard';

const UserList = styled.div`
display: flex;
flex-flow: row wrap;
margin-top: 200px;
`;

const UserListContainer = () => {

    return (
        <Query query={GET_ALL_USERS}>
            {({ loading, error, data: { users } }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return (
                    <UserList>
                        {users.map(c => <ProfileCard contact={c} key={c.id}/>)}
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