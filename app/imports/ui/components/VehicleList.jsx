import React from 'react';
import { Grid, Header, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { v4 as uuidv4 } from 'uuid';
import VehicleCard from '../components/VehicleCard';

/** Renders a single vehicle card. */
class VehicleList extends React.Component {
  render() {
    return (
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
            {_.map(this.props.userVehicles, (vehicle, index) => (
              <Grid.Column key={index}>
                <VehicleCard vehicle={vehicle} id={uuidv4()} />
              </Grid.Column>
            ))}
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Currently, placeholder vehicle data is passed to this component. In production, require a document to be passed to this component. */
VehicleList.propTypes = {
  // vehicle: PropTypes.object.isRequired,
  userVehicles: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(VehicleList);
