import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
// import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import VehicleList from '../components/VehicleList';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { Make } from '../../api/make/Make';

/** Renders a feed containing all of the Vehicle documents. Use <VehicleCard> to render each card. */
class MyVehicles extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting vehicles.</Loader>
    );
  }

  /** Render the page once subscriptions of Vehicles collection have been received. */
  renderPage() {
    /** Finds the vehicles that are owned by the user */
    const email = Meteor.user().username;
    const userVehicles = Vehicle.collection.find({ owner: email }).fetch();
    return (
      <div className='background-all'>
        <VehicleList userVehicles={userVehicles} />
        {/* <Grid centered stackable columns={1} className={'my-vehicles-grid'}>
          <Grid.Column>
            <Header as='h1' textAlign='center'>
              My Vehicles
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Search
              input={{ icon: 'search', iconPosition: 'left' }}
              placeholder={'Search'}
            />
          </Grid.Column>
          <Grid.Column>
            <Grid stackable columns={3}>
              {_.map(userVehicles, (vehicle, index) => (
                <Grid.Column key={index}>
                  <VehicleCard vehicle={vehicle} />
                </Grid.Column>
              ))}
            </Grid>
          </Grid.Column>
        </Grid> */}
        <a href='#/create-vehicle'>
          <Button circular icon='add' size='massive' />
        </a>
      </div>
    );
  }
}

/** Require an array of Vehicle documents in the props. */
MyVehicles.propTypes = {
  // KEEP FOR REFERENCE: stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // KEEP FOR REFERENCE: Get access to Stuff documents.
  const sub1 = Meteor.subscribe(Vehicle.userPublicationName);
  const sub2 = Meteor.subscribe(Make.userPublicationName);
  return {
    // KEEP FOR REFERENCE: stuffs: Stuffs.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready(),
  };
})(MyVehicles);
