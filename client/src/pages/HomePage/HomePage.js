import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SidebarContainer from '../../containers/SidebarContainer';
import NoChat from '../../components/NoChat/NoChat';
import ChatContainer from '../../containers/ChatContainer';
import { getCurrentContact } from '../../selectors/contactSelectors';

const Container = styled.div`
    display: flex;
`;

const HomePage = ({ contact }) => {

  var panel = <NoChat />

  if (contact) {
    panel = <ChatContainer contact={contact} />
  }

  return (
    <Container>
      <SidebarContainer />

      {panel}

    </Container>
  );
}


const mapState = (state) => {
  return {
    contact: getCurrentContact(state),
  }
}

export default connect(mapState)(HomePage);