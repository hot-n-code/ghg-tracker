import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { computeCO2Reduced, computeFuelSaved } from '../../utilities/GlobalFunctions';

/** Renders a single vehicle card. */
class TeleworkCard extends React.Component {

  render() {
    let totalMiles = 0;
    const trips = this.props.userData.filter(userData => userData.modeOfTransportation === 'Telework');
    trips.forEach(data => { totalMiles += data.milesTraveled; });

    return (
        <Card centered link className={'alt-vehicle-card'}>
          <Card.Content>
            <Image className={'alt-vehicle-image'} src='images/altvehicle-page/telework.png'/>
            <Card.Header className={'alt-vehicle-card-header'}>
              Telework
            </Card.Header>
            <Card.Description>
              <span className={'alt-vehicle-card-label'}>Total Miles: </span>
              {totalMiles}
              <br/>
              <span className={'alt-vehicle-card-label'}>CO2 Reduced: </span>
              {computeCO2Reduced(totalMiles, 'Public Transportation', this.props.userVehicles)}
              <br/>
              <span className={'alt-vehicle-card-label'}>Fuel Saved: </span>
              {computeFuelSaved(totalMiles, this.props.userVehicles, trips.length)}
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
TeleworkCard.propTypes = {
  userData: PropTypes.array.isRequired,
  userVehicles: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default TeleworkCard;
