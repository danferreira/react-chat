import React from 'react';
import { connect } from 'react-redux';

import SidebarContainer from '../../containers/SidebarContainer';
import NoChat from '../../components/NoChat/NoChat';
import ChatContainer from '../../containers/ChatContainer';
import { getCurrentContactId } from '../../selectors/contactSelectors';
import './HomePage.css';

const HomePage = ({ contactId }) => {

  var panel = <NoChat />
  
  if (contactId) {
    panel = <ChatContainer contactId={contactId} />
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
    contactId: getCurrentContactId(state),
  }
}

export default connect(mapState)(HomePage);