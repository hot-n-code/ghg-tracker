import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getCumulativePerMode } from '../utilities/CumulativeGHGData';

/** Renders a single vehicle card. */
class AltVehicleCard extends React.Component {

  /** State to display. 0-4 */
  state = {
    display: 0,
  }

  /** Set next state to display. Cannot be under 0 or over 4 */
  nextState = display => {
    if (display > 4) {
      this.setState({ display: 0 });
    } else if (display < 0) {
      this.setState({ display: 4 });
    } else {
      this.setState({ display });
    }
  }

  /** Renders the page */
  render() {
    /** Array of transportation and images */
    const transportation = ['Walking', 'Biking', 'Public Transportation', 'Carpool', 'Telework'];
    const images = ['images/altvehicle-page/Walking.png', 'images/altvehicle-page/Biking.png', 'images/altvehicle-page/Bussing.jpg',
      'images/altvehicle-page/Carpool.png', 'images/altvehicle-page/telework.png'];

    /** Pass value of display */
    let state = this.state.display;
    /** Get data depending on state */
    const transportationData = getCumulativePerMode(this.props.userData, transportation[state]);

    return (
        <Card centered link className={'alt-vehicle-card'}>
          <Card.Content>
            <Image className={'alt-vehicle-image'} src={images[state]}/>
            <Card.Header className={'alt-vehicle-card-header'}>
              {transportation[state]}
            </Card.Header>
            <Card.Description>
              <span className={'alt-vehicle-card-label'}>Total Miles: </span>
              {transportationData.VMTReduced}
              <br/>
              <span className={'alt-vehicle-card-label'}>CO2 Reduced: </span>
              {transportationData.cO2Reduced}
              <br/>
              <span className={'alt-vehicle-card-label'}>Fuel Saved: </span>
              {transportationData.fuelSaved}
            </Card.Description>
            <br/>
            <Button inverted color='green' onClick={() => { this.nextState(state -= 1); }}>
              Prev
            </Button>
            <Button inverted color='green' onClick={() => { this.nextState(state += 1); }}>
              Next
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Requires userData and userVehicles */
AltVehicleCard.propTypes = {
  userData: PropTypes.array.isRequired,
  userVehicles: PropTypes.array.isRequired,
};

export default AltVehicleCard;
