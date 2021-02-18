import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single vehicle card. */
class VehicleCard extends React.Component {
  render() {
    return (
      <Card centered link className={'vehicle-card'}>
        <Card.Content>
          <Image src={this.props.vehicle.logo} centered size='small' />
          <Card.Header className={'vehicle-card-header'}>
            {this.props.vehicle.year} {this.props.vehicle.make}{' '}
            {this.props.vehicle.model}
          </Card.Header>
          <Card.Description>
            <span className={'vehicle-card-label'}>Purchase Price: </span>$
            {this.props.vehicle.price}
          </Card.Description>
          <Card.Description>
            <span className={'vehicle-card-label'}>
              Average Fuel Consumption:{' '}
            </span>
            {this.props.vehicle.MPG}
          </Card.Description>
          <Card.Description>
            <span className={'vehicle-card-label'}>Yearly Fuel Spending: </span>
            ${this.props.vehicle.fuelSpending}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button inverted color='green'>
            Show More
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

/** Currently, placeholder vehicle data is passed to this component. In production, require a document to be passed to this component. */
VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(VehicleCard);
