import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import LandingNewsFeed from '../components/LandingNewsFeed';
import LandingCumulativeData from '../components/LandingCumulativeData';
import LandingDescription from '../components/LandingDescription';

const menuStyle = { height: '500px' };

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <div className='background-landing' style={menuStyle}>
            <div className='ghg-text'>
              <Header textAlign="center" size="massive" inverted> GHG Tracker </Header>
            </div>
            <Header className="logo-description" textAlign="center" inverted> Tracking greenhouse gas emissions that are released from your every day transportation.</Header>
          </div>
          <LandingDescription/>
          <LandingCumulativeData/>
          <LandingNewsFeed />
        </div>
    );
  }
}

export default Landing;
