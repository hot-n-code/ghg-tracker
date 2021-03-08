import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import VehicleCard from '../components/VehicleCard';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { Make } from '../../api/make/Make';

/** Renders a feed containing all of the Vehicle documents. Use <VehicleCard> to render each card. */
class VehicleList extends React.Component {
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
      <div className='vehicle-list-container'>
        <Grid stackable columns={3}>
          {userVehicles.map((vehicle, index) => (
            <Grid.Column key={index} className='vehicle-list-item'>
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
  }
}

/** Require an array of Vehicle documents in the props. */
VehicleList.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const sub1 = Meteor.subscribe(Vehicle.userPublicationName);
  const sub2 = Meteor.subscribe(Make.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready(),
  };
})(VehicleList);
