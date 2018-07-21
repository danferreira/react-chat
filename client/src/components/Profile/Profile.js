import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar from '../Avatar/Avatar';

const ProfileWrapper = styled.div`
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Name = styled.label`
    text-align: center;
    margin-top: 20px;
    font-size: 28px;
`;

const Email = styled.label`
    text-align: center;
    font-size: 16px;
`;

const BioContainer = styled.div`
    text-align: center;
    width: 60%;
    margin-top: 5px;
    font-size: 14px;
`;

const Form = styled.form`
    width: 300px;
`;

const FormInput = styled.textarea`
    display: block;
    border-radius: 5px;
    outline: none;
    resize: none;
    border: solid 1px #e8e8e8;
    padding: 10px;
    overflow: auto;
    width: 100%;
    margin-top: 25px;
`;

const Button = styled.button`
    float:right;
    background-color: green;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    font-size: 15px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;

    :hover {
        background-color: rgb(21, 177, 21);
    }
`;

const propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string,
        avatar: PropTypes.string
    }),
    onSendMessage: PropTypes.func
}

const Profile = ({ user, onSendMessage }) => {
    let input;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!input.value.trim()) return;

        if (onSendMessage) {
            onSendMessage(input.value.trim(), user);
        } else {
            console.log(input.value.trim());
        }
    }

    return (
        <ProfileWrapper>
            <Info>
                <Avatar
                    rounded
                    size="medium"
                    source="/images/User-2.jpg" />
                <Name>{user.name}</Name>
                <Email>{user.email}</Email>
                <BioContainer>
                    <p>{user.bio}</p>
                </BioContainer>
            </Info>
            <Form onSubmit={handleSubmit}>
                <FormInput 
                    rows="4" 
                    cols="50"
                    ref={node => input = node} 
                    placeholder="Remember, be nice!" />
                <Button>Send</Button>
            </Form>
        </ProfileWrapper>
    );
}

Profile.propTypes = propTypes;

export default Profile;