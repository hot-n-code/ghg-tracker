import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single vehicle card. */
class AltVehicleCard extends React.Component {
  render() {
    return (
        <Card centered link className={'vehicle-card'}>
          <Card.Content>
            <Image src={this.props.vehicle.image} centered size='small'/>
            <Card.Header className={'vehicle-card-header'}>
              {this.props.vehicle.name}
            </Card.Header>
            <Card.Description>
              <span className={'vehicle-card-label'}>Total Miles: </span>
              {this.props.vehicle.milesTraveled}
            </Card.Description>
            <Card.Description>
              <span className={'vehicle-card-label'}>Total Fuel Saved: </span>
              {this.props.vehicle.fuelSaved}
            </Card.Description>
              {this.props.vehicle.physical === true ? (
                  <Card.Description>
                    <span className={'vehicle-card-label'}>Total Calories Burnt: </span>
                    {this.props.vehicle.fuelSaved}
                  </Card.Description>
              ) : ''}
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
AltVehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AltVehicleCard);
