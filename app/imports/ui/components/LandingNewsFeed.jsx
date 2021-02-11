import React from 'react';
import { Header } from 'semantic-ui-react';

const paddingStyle = { padding: '20px' };

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class LandingNewsFeed extends React.Component {
  render() {
    return (
        <Header as='h1' style={paddingStyle}>Stay in the Swell and Check Out the Latest News on Green House Gasses.. </Header>
    );
  }
}

export default LandingNewsFeed;
