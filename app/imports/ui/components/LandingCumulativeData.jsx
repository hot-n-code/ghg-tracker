import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const paddingStyle = { padding: '20px' };

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingCumulativeData = () => (
    <div className='landing-data' style={paddingStyle}>
      <Header as='h1' textAlign='center'> <u>Malama I Ka `Aina</u></Header>
      <Header as='h2' textAlign='center'> Do your part to save Hawai&apos;i and track your carbon footprint today. </Header>
        <br/>
        <Header as='h2' textAlign='center'> Make A Difference Today.
          <br/>
        <Button className="ui massive black basic button" position='centered' as={NavLink} activeClassName="active" exact to="/signup" color='blue'>Sign Up</Button>
        </Header>
    </div>
    );

export default LandingCumulativeData;
