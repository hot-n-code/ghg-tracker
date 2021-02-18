import React from 'react';
import { Meteor } from 'meteor/meteor';
import {  Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AltVehicleCard from '../components/AltVehicleCard';
import { Stuffs } from '../../api/stuff/Stuff';

const paddingStyle = { padding: 20 };

const sampleVehicleData = [
  {
    name: 'Walking',
    image:
        'images/Walking.png',
    milesTraveled: 'xx',
    fuelSaved: 'xx',
    physical: true,
    caloriesBurnt: 'xx',
  },
  {
    name: 'Biking',
    image:
        'images/Biking.png',
    milesTraveled: 'xx',
    fuelSaved: 'xx',
    physical: true,
    caloriesBurnt: 'xx',
  },
  {
    name: 'Bussing',
    image:
        'images/Bussing.jpg',
    milesTraveled: 'xx',
    fuelSaved: 'xx',
    physical: false,
    caloriesBurnt: 'xx',
  },
  {
    name: 'Alternative Fuel Vehicles',
    image:
        'images/AltFuel.png',
    milesTraveled: 'xx',
    fuelSaved: 'xx',
    physical: false,
    caloriesBurnt: 'xx',
  },
  {
    name: 'Carpool',
    image:
        'images/Carpool.png',
    milesTraveled: 'xx',
    fuelSaved: 'xx',
    physical: false,
    caloriesBurnt: 'xx',
  }
];

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
    return (
        <div style={paddingStyle}>
          <Grid centered stackable columns={1} className={'my-vehicles-grid'}>
            <Grid.Column>
              <Header as='h1' textAlign='center'>
                Alternative Transportation
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Grid stackable columns={3}>
                {sampleVehicleData.map((vehicle, index) => (
                    <Grid.Column key={index}>
                      <AltVehicleCard vehicle={vehicle} />
                    </Grid.Column>
                ))}
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
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  return {
    // KEEP FOR REFERENCE: stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AltTransportation);
