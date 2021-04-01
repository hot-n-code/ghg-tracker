import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Button, Image, Grid, Loader } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { getCumulativeGHG } from '../utilities/CumulativeGHGData';
import { Users } from '../../api/user/UserCollection';

const paddingStyle = { padding: '20px' };
const cloud = '../images/landing-page/cloud-trans-5.png';

class LandingCumulativeData extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting your data...</Loader>;
  }

  renderPage() {
    // Get daily data
    const ghgData = getCumulativeGHG(this.props.dailyData);
    const totalCO2Reduced = ghgData.cO2Reduced;

    return (
        <div className='landing-data' style={paddingStyle}>
          <Header as='h1' textAlign='center'> <u>Malama I Ka `Aina</u></Header>
          <Header as='h2' textAlign='center'> Do your part to save Hawai&apos;i and track your carbon footprint
            today. </Header>
          <Grid columns={3}>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <div className='cloud-box'>
                <Image src={cloud}/>
                <Header as='h2' id='cloud-carbon'> {totalCO2Reduced} LBS.</Header>
              </div>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid>
          <br/>
          <Header as='h2' textAlign='center'> Make A Difference Today.
            <br/>
            <div style={{ paddingTop: '16px' }}></div>
            <Button className="ui massive blue button" position='centered' as={NavLink} activeClassName="active" exact
                    to="/signup">Sign Up</Button>
          </Header>
        </div>
    );
  }
}
LandingCumulativeData.propTypes = {
  dailyData: PropTypes.array.isRequired,
  users: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe(DailyUserData.userPublicationName);
  const subscription2 = Meteor.subscribe(Users.userPublicationName);
  return {
    dailyData: DailyUserData.collection.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(LandingCumulativeData);
