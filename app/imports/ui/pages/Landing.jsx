import React from 'react';
import { Header } from 'semantic-ui-react';
import LandingNewsFeed from '../components/landing-page/LandingNewsFeed';
import LandingCumulativeData from '../components/landing-page/LandingCumulativeData';
import LandingDescription from '../components/landing-page/LandingDescription';

const menuStyle = { height: '500px' };
const padding = { paddingTop: '100px' };

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <div className='background-landing' style={menuStyle}>
            <div style={padding} className='ghg-text'>
              <Header textAlign="center" inverted> GHG Tracker </Header>
            </div>
            <Header className="logo-description" textAlign="center" inverted as='h2'> Tracking greenhouse gas emissions that are released from your every day transportation.</Header>
          </div>
          <LandingDescription/>
          <LandingCumulativeData/>
          <LandingNewsFeed />
        </div>
    );
  }
}

export default Landing;
