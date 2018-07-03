import React from 'react';
import { connect } from 'react-redux';

import SidebarContainer from '../../containers/SidebarContainer';
import NoChat from '../../components/NoChat/NoChat';
import ChatContainer from '../../containers/ChatContainer';
import { getCurrentContact } from '../../selectors/contactSelectors';
import './HomePage.css';

const HomePage = ({ contact }) => {

  var panel = <NoChat />
  
  if (contact) {
    panel = <ChatContainer contact={contact} />
  }

  return (
    <div className="container">
      <SidebarContainer />

      {panel}

    </div>
  );
}


const mapState = (state) => {
  return {
    contact: getCurrentContact(state),
  }
}

export default connect(mapState)(HomePage);