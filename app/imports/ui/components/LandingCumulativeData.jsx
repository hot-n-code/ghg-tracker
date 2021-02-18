import React from 'react';
import { Header, Button, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const paddingStyle = { padding: '20px' };

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingCumulativeData = () => (
    <div className='landing-data' style={paddingStyle}>
      <Header as='h1' textAlign='center'> <u>Malama I Ka `Aina</u></Header>
      <Header as='h2' textAlign='center'> Do your part to save Hawai&apos;i and track your carbon footprint today. </Header>
      <Image centered src='/images/landing-page/cloud-trans-2.png' padding={0} />
        <br/>
        <Header as='h2' textAlign='center'> Make A Difference Today.
          <br/>
        <Button className="ui massive blue button" position='centered' as={NavLink} activeClassName="active" exact to="/signup">Sign Up</Button>
        </Header>
    </div>
    );

export default LandingCumulativeData;
