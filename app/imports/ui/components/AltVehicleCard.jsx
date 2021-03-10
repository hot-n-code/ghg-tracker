import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single vehicle card. */
class AltVehicleCard extends React.Component {
  render() {
    return (
        <Card centered link className={'vehicle-card'}>
          <Card.Content>
            <Card.Header className={'vehicle-card-header'}>
              {this.props.data.modeOfTransportation}
            </Card.Header>
            <Card.Description>
              <span className={'vehicle-card-label'}>Total Miles: </span>
              {this.props.data.milesTraveled}
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
AltVehicleCard.propTypes = {
  data: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default AltVehicleCard;
