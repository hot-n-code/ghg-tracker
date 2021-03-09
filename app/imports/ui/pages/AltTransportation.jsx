import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
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
    const email = Meteor.user().username;
    const userData = [];
    DailyUserData.collection.find({ owner: email }).forEach(
        function (data) {
          userData.push(data);
        },
    );

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
                  <WalkingCard userData={userData}/>
                </Grid.Column>
                <Grid.Column>
                  <BikingCard userData={userData}/>
                </Grid.Column>
                <Grid.Column>
                  <PublicTransportCard userData={userData}/>
                </Grid.Column>
                <Grid.Column>
                  <CarpoolCard userData={userData}/>
                </Grid.Column>
                <Grid.Column>
                  <ElectricVehicleCard userData={userData}/>
                </Grid.Column>
                <Grid.Column>
                  <TeleworkCard userData={userData}/>
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
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // KEEP FOR REFERENCE: Get access to Stuff documents.
  const subscription = Meteor.subscribe(DailyUserData.userPublicationName);
  return {
    // KEEP FOR REFERENCE: stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AltTransportation);
