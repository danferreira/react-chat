import React from 'react';

import ProfileContainer from '../../containers/ProfileContainer';

const ProfilePage = ({match}) => <ProfileContainer userId={parseInt(match.params.id)} />

export default ProfilePage;