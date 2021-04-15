import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../../api/user/DailyUserDataCollection';
import { UserVehicle } from '../../../api/user/UserVehicleCollection';
import AltVehicleCard from '../../components/user-page/AltVehicleCard';
import LeafWidget from '../../components/user-page/LeafWidget';

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
          <Grid centered stackable columns={3} className={'my-vehicles-grid'}>
            <Grid.Column>
              <Header as='h1' textAlign='center'>
                Alternative Transportation
              </Header>
            </Grid.Column>
            <Grid.Column>
              <AltVehicleCard userData={userData} userVehicles={userVehicles}/>
            </Grid.Column>
            <Grid.Column>
              <Container><LeafWidget userData={userData} userVehicles={userVehicles}/>
              </Container>
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
  const subscription2 = Meteor.subscribe(UserVehicle.userPublicationName);
  return {
    // KEEP FOR REFERENCE: stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
    data: DailyUserData.collection.find({ owner: currentUser }).fetch(),
    vehicles: UserVehicle.collection.find({ owner: currentUser }).fetch(),
  };
})(AltTransportation);
