import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import LandingNewsFeed from '../components/LandingNewsFeed';
import LandingCumulativeData from '../components/LandingCumulativeData';
import LandingDescription from '../components/LandingDescription';

const menuStyle = { height: '500px' };
const space = { paddingTop: '100px' };

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <Container fluid>
          <div className='background-landing' style={menuStyle}>
            <div style={space} className='ghg-text'>
              <Header textAlign="center" size="massive" inverted> GHG Tracker </Header>
            </div>
            <Header className="logo-description" textAlign="center" inverted> Tracking greenhouse gas emissions that are released from your every day transportation.</Header>
          </div>
          </Container>
          <LandingDescription/>
          <LandingCumulativeData/>
          <LandingNewsFeed />
        </div>
    );
  }
}

export default Landing;
