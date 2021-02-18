import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Grid, Header, Loader, Search } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import VehicleCard from '../components/VehicleCard';
import { Vehicle } from '../../api/vehicle/VehicleCollection';

/** Renders a feed containing all of the Vehicle documents. Use <VehicleCard> to render each card. */
class MyVehicles extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
        this.renderPage()
    ) : (
        <Loader active>Getting data</Loader>
    );
  }

  /** Render the page once subscriptions of Vehicles collection have been received. */
  renderPage() {
    /** Finds the vehicles that are owned by the user */
    const email = Meteor.user().username;
    const userVehicle = Vehicle.collection.find({ owner: email }).fetch();
    return (
      <div className='background-all'>
        <Grid centered stackable columns={1} className={'my-vehicles-grid'}>
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
              {_.map(userVehicle, (vehicle, index) => (
                <Grid.Column key={index}>
                  <VehicleCard vehicle={vehicle} />
                </Grid.Column>
              ))}
            </Grid>
          </Grid.Column>
        </Grid>
        <Button circular icon='add' size='massive' />
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
  const subscription = Meteor.subscribe(Vehicle.userPublicationName);
  return {
    // KEEP FOR REFERENCE: stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MyVehicles);
