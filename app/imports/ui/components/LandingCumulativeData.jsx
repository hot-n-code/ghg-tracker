import React from 'react';
import { Header, Button, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

const paddingStyle = { padding: '20px' };
const ghg = _.pluck(DailyUserData.collection.find({}).fetch(), 'cO2Reduced');
const ghgTotal = _.reduce(ghg, function (sum, num) { return sum + num; }, 0);
/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingCumulativeData = () => (
    <div className='landing-data' style={paddingStyle}>
      <Header as='h1' textAlign='center'> <u>Malama I Ka `Aina</u></Header>
      <Header as='h2' textAlign='center'> Do your part to save Hawai&apos;i and track your carbon footprint today. </Header>
      <Image centered src='/images/landing-page/cloud-trans.png' padding={0} />
      <Header as='h2' id='cloud-carbon'> {ghgTotal} LBS.</Header>
        <br/>
        <Header as='h2' textAlign='center'> Make A Difference Today.
          <br/>
          <div style={{ paddingTop: '16px' }}></div>
        <Button className="ui massive blue button" position='centered' as={NavLink} activeClassName="active" exact to="/signup">Sign Up</Button>
        </Header>
    </div>
    );

export default LandingCumulativeData;
