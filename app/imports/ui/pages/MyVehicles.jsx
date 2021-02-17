import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Grid, Header, Loader, Search } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import VehicleCard from '../components/VehicleCard';
import { Vehicle } from '../../api/vehicle/VehicleCollection';

const paddingStyle = { padding: 20 };

function getVehicleData(model) {
  const make = _.pluck(Vehicle.collection.find({ model: model }).fetch(), 'make');
  const logo = _.pluck(Vehicle.collection.find({ model: model }).fetch(), 'logo');
  const price = _.pluck(Vehicle.collection.find({ model: model }).fetch(), 'price');
  const year = _.pluck(Vehicle.collection.find({ model: model }).fetch(), 'year');
  const MPG = _.pluck(Vehicle.collection.find({ model: model }).fetch(), 'MPG');
  const fuelSpending = _.pluck(Vehicle.collection.find({ model: model }).fetch(), 'fuelSpending');
  return _.extend({ }, { make, model, logo, price, year, MPG, fuelSpending });
}

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
    const owner = _.pluck(Vehicle.collection.find({ owner: 'tim@gmail.com' }).fetch(), 'model');
    const ownerData = owner.map(model => getVehicleData(model));
    return (
        <div style={paddingStyle}>
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
                {_.map(ownerData, (vehicle, index) => (
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
