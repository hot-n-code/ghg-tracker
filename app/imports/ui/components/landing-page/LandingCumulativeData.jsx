import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Button, Image, Grid, Loader } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { DailyUserData } from '../../../api/user/DailyUserDataCollection';
import { getCumulativeGHG } from '../../utilities/CumulativeGHGData';
import { UserVehicle } from '../../../api/user/UserVehicleCollection';

const paddingStyle = { padding: '20px' };
const cloud = '../images/landing-page/cloud-trans-5.png';

class LandingCumulativeData extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting your data...</Loader>;
  }

  renderPage() {
    // Get daily data
    const ghgData = getCumulativeGHG(this.props.dailyData, this.props.vehicles);
    const totalCO2Reduced = ghgData.cO2Reduced.toFixed(2);

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
  vehicles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = Meteor.subscribe(DailyUserData.cumulativePublicationName).ready() &&
      Meteor.subscribe(UserVehicle.adminPublicationName).ready();
  const dailyData = DailyUserData.collection.find({}).fetch();
  const vehicles = UserVehicle.collection.find({}).fetch();
  return {
    dailyData,
    vehicles,
    ready,
  };
})(LandingCumulativeData);
