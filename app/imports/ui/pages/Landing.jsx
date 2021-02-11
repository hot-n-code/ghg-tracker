import React from 'react';
import { Header, Grid, Embed } from 'semantic-ui-react';
import LandingNewsFeed from '../components/LandingNewsFeed';
import LandingCumulativeData from '../components/LandingCumulativeData';

const menuStyle = { height: '500px' };
const paddingStyle = { padding: '20px' };

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
            <Grid columns={2} stackable style={paddingStyle}>
              <Grid.Column>
                <Header as='h1' textAlign='center' > <u>WHO ARE WE?</u> </Header>
              <br />
            <Header as='h2' textAlign='center'>
              We want to help the people of Hawaii track their carbon footprint.
              <br/>
              Climate change has the potential to increase the severity and frequency of hurricanes, flooding, and droughts, and is expected to
              lead to increasing sea level rise.
              <br />
            These climate change impacts could cause damage to our physical facilities at Hawaiian Electric and to the properties that secure American Savings Bank’s residential and commercial loan
                <br />
                GHG is the most significant factor in climate change.
              </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h2">Learn about the impact of cars carbon emission on the planet</Header>
                <Embed
                    id='r-qZ4qxLgDc'
                    placeholder='images/video-prev.png'
                    source='youtube'
                />
                <Header as='h3'><i>Source: Cars (CISL Version). YouTube, uploaded by Real World Visuals.</i>
              </Header>
              </Grid.Column>
            </Grid>
          </div>
          <LandingCumulativeData/>
          <LandingNewsFeed />
      <div>
        <div className='background-landing' style={menuStyle}>
          <div className='ghg-text'>
            <Header textAlign='center' size='massive' inverted>
              {' '}
              GHG Tracker{' '}
            </Header>
          </div>
          <Header className='logo-description' textAlign='center' inverted>
            {' '}
            Tracking greenhouse gas emissions that are released from your every
            day transportation.
          </Header>
        </div>
        <div>
          <Grid columns={2} stackable style={paddingStyle}>
            <Grid.Column>
              <Header as='h1' textAlign='center'>
                {' '}
                <u>WHO ARE WE?</u>{' '}
              </Header>
              <br />
              <Header as='h2' textAlign='center'>
                We want to help the people of Hawaii track their carbon
                footprint.
                <br />
                Climate change has the potential to increase the severity and
                frequency of hurricanes, flooding, and droughts, and is expected
                to lead to increasing sea level rise.
                <br />
                These climate change impacts could cause damage to our physical
                facilities at Hawaiian Electric and to the properties that
                secure American Savings Bank’s residential and commercial loan
                <br />
                GHG is the most significant factor in climate change.
              </Header>
            </Grid.Column>
            <Grid.Column>
               <Header as='h2'>
                Learn about the impact of cars carbon emission on the planet
              </Header>
              <Embed
                id='r-qZ4qxLgDc'
                placeholder='images/video-prev.png'
                source='youtube'
              />
              <Header as='h3'>
                <i>
                  Source: Cars (CISL Version). YouTube, uploaded by Real World
                  Visuals.
                </i>
              </Header>
            </Grid.Column>
          </Grid>
        </div>
        <LandingCumulativeData />
        <LandingNewsFeed />
      </div>
        </div>
    );
  }
}

export default Landing;
