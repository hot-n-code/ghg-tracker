import React from 'react';
import { Header, Button, Image, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const paddingStyle = { padding: '20px' };
const cloud = '../images/landing-page/cloud-trans-blank.png';
/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingCumulativeData = () => (
    <div className='landing-data' style={paddingStyle}>
      <Header as='h1' textAlign='center'> <u>Malama I Ka `Aina</u></Header>
      <Header as='h2' textAlign='center'> Do your part to save Hawai&apos;i and track your carbon footprint today. </Header>
      <Grid columns={3}>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Image src={cloud}/>
            <Header> 0lbs </Header>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
      </Grid>
        <br/>
        <Header as='h2' textAlign='center'> Make A Difference Today.
          <br/>
          <div style={{ paddingTop: '16px' }}></div>
        <Button className="ui massive blue button" position='centered' as={NavLink} activeClassName="active" exact to="/signup">Sign Up</Button>
        </Header>
    </div>
    );

export default LandingCumulativeData;
