import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import WalkingCard from '../components/altvehiclecards/WalkingCard';
import BikingCard from '../components/altvehiclecards/BikingCard';
import PublicTransportCard from '../components/altvehiclecards/PublicTransportCard';
import CarpoolCard from '../components/altvehiclecards/CarpoolCard';
import ElectricVehicleCard from '../components/altvehiclecards/ElectricVehicleCard';
import TeleworkCard from '../components/altvehiclecards/TeleworkCard';

class AltTransportation extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
        this.renderPage()
    ) : (
        <Loader active>Getting data</Loader>
    );
  }

  /** Render the page once subscriptions of Alt Vehicles collection have been received. */
  renderPage() {
    const userData = this.props.data;
    const userVehicles = this.props.vehicles;

    return (
        <div className='background-all'>
          <Grid centered stackable columns={1} className={'my-vehicles-grid'}>
            <Grid.Column>
              <Header as='h1' textAlign='center'>
                Alternative Transportation
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Grid stackable columns={3}>
                <Grid.Column>
                  <WalkingCard userData={userData} userVehicles={userVehicles}/>
                </Grid.Column>
                <Grid.Column>
                  <BikingCard userData={userData} userVehicles={userVehicles}/>
                </Grid.Column>
                <Grid.Column>
                  <PublicTransportCard userData={userData} userVehicles={userVehicles}/>
                </Grid.Column>
                <Grid.Column>
                  <CarpoolCard userData={userData} userVehicles={userVehicles}/>
                </Grid.Column>
                <Grid.Column>
                  <ElectricVehicleCard userData={userData} userVehicles={userVehicles}/>
                </Grid.Column>
                <Grid.Column>
                  <TeleworkCard userData={userData} userVehicles={userVehicles}/>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require an array of Vehicle documents in the props. */
AltTransportation.propTypes = {
  // KEEP FOR REFERENCE: stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // KEEP FOR REFERENCE: Get access to Stuff documents.
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const subscription = Meteor.subscribe(DailyUserData.userPublicationName);
  const subscription2 = Meteor.subscribe(Vehicle.userPublicationName);
  return {
    // KEEP FOR REFERENCE: stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
    data: DailyUserData.collection.find({ owner: currentUser }).fetch(),
    vehicles: Vehicle.collection.find({ owner: currentUser }).fetch(),
  };
})(AltTransportation);
