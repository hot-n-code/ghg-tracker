import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import VehicleList from '../../components/vehicle-page/VehicleList';

/** Renders a feed containing all of the Vehicle documents. Use <VehicleCard> to render each card. */
class MyVehicles extends React.Component {

  /** Render the page of the user's vehicles. */
  render() {
    return (
      <div className='vehicle-list-container background-all' id='my-vehicles-page'>
        <Grid centered stackable columns={1} className={'my-vehicles-grid'}>
          <Grid.Column>
            <Header as='h1' textAlign='center'>
              My Vehicles
            </Header>
          </Grid.Column>
          <Grid.Column>
            <VehicleList />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default (MyVehicles);
