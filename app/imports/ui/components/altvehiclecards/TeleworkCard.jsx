import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single vehicle card. */
class TeleworkCard extends React.Component {

  render() {
    let totalMiles = 0;
    const trips = this.props.userData.filter(userData => userData.modeOfTransportation === 'Telework');
    trips.forEach(data => { totalMiles += data.milesTraveled; });

    return (
        <Card centered link className={'vehicle-card'}>
          <Card.Content>
            <Image src='images/telework.png'/>
            <Card.Header className={'vehicle-card-header'}>
              Telework
            </Card.Header>
            <Card.Description>
              <span className={'vehicle-card-label'}>Total Miles: </span>
              {totalMiles}
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
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default TeleworkCard;