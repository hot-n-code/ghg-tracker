import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Grid, Header, Search, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { Make } from '../../api/make/Make';
import VehicleList from '../components/VehicleList';

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

  /** Render the page of the user's vehicles. */
  renderPage() {
    return (
      <div className='vehicle-list-container background-all'>
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
            <VehicleList />
          </Grid.Column>
        </Grid>
        <a href='#/create-vehicle'>
          <Button circular icon='add' size='massive' />
        </a>
      </div>
    );
  }
}

/** Require an array of Vehicle documents in the props. */
MyVehicles.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const sub1 = Meteor.subscribe(Vehicle.userPublicationName);
  const sub2 = Meteor.subscribe(Make.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready(),
  };
})(MyVehicles);
