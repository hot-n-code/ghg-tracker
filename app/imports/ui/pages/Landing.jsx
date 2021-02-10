import React from 'react';
import { Header } from 'semantic-ui-react';

const menuStyle = { height: '500px' };
const backgroundColor = { color: #f9f8eb };

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
          <div>
          </div>
        </div>
    );
  }
}

export default Landing;
