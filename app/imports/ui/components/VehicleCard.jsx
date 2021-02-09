import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single vehicle card. */
class VehicleCard extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <h1>BRAND LOGO</h1>
          <Card.Header>{this.props.vehicle.make}</Card.Header>
          <Card.Meta>
            {this.props.vehicle.year} {this.props.vehicle.model}
          </Card.Meta>
          <Card.Description>
            Purchase Price: {this.props.vehicle.price}
          </Card.Description>
          <Card.Description>
            Average Fuel Consumption: {this.props.vehicle.consumption}
          </Card.Description>
          <Card.Description>
            Yearly Fuel Spending: {this.props.vehicle.fuelSpending}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>Show More</Card.Content>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(VehicleCard);
