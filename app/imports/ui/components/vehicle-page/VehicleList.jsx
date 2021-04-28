import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import VehicleCard from './VehicleCard';
import AddVehicleModal from './AddVehicleModal';
import { UserVehicles } from '../../../api/user/UserVehicleCollection';
import { AllVehicles } from '../../../api/vehicle/AllVehicleCollection';

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
    const email = Meteor.user().username;
    const userVehicles = _.where(this.props.vehicles, { owner: email });
    return (
      <div className='vehicle-list-container'>
        <Grid stackable columns={3}>
          {userVehicles.map((vehicle, index) => (
            <Grid.Column key={index} className='vehicle-list-item'>
              <VehicleCard key={vehicle._id} vehicle={vehicle} allEVHybridVehicles={this.props.allEVHybridVehicles} />
            </Grid.Column>
          ))}
        </Grid>
        <AddVehicleModal allVehicles={this.props.allVehicles}/>
      </div>
    );
  }
}

/** Require an array of Vehicle documents in the props. */
VehicleList.propTypes = {
  ready: PropTypes.bool.isRequired,
  vehicles: PropTypes.array.isRequired,
  allVehicles: PropTypes.array.isRequired,
  allEVHybridVehicles: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const sub1 = UserVehicles.subscribeUserVehicle();
  const sub2 = AllVehicles.subscribeAllVehicle();
  return {
    ready: sub1.ready() && sub2.ready(),
    vehicles: UserVehicles.find({}).fetch(),
    allVehicles: AllVehicles.find({}).fetch(),
    allEVHybridVehicles: AllVehicles.find({ Mpg: { $lt: 0 } }, { sort: [['Make', 'asc']] }).fetch(),
  };
})(VehicleList);
