import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

import ProfileCard from '../components/ProfileCard/ProfileCard';

const UserListContainer = () => {

    return (
        <Query query={GET_ALL_USERS}>
            {({ loading, error, data: { getAllUsers } }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return (
                    <article className="user-list">
                        {getAllUsers.map(c => <ProfileCard contact={c} key={c.id}/>)}
                    </article>
                )
            }}

        </Query>
    );
}

const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id
            email
        }
    }
`;

export default UserListContainer;