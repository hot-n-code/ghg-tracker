import React from 'react';
import { Header, Container, Grid, Image } from 'semantic-ui-react';
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
            <Grid rows={3} stackable>
              <Grid.Row>
            <Header className="logo-description" textAlign="center" inverted as='h2'> Tracking greenhouse gas emissions that are released from your every day transportation.</Header>
              </Grid.Row>
              <Grid.Row>
              <Header as='h1' inverted> Carbon Saved to Date: </Header>
              </Grid.Row>
              <Grid.Row>
                <Image src='images/landing-page/cloud-trans.png' size='medium' padding={0} />
              </Grid.Row>
            </Grid>
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
