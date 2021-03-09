import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single vehicle card. */
class PublicTransportCard extends React.Component {

  render() {
    let totalMiles = 0;
    const trips = this.props.userData.filter(userData => userData.modeOfTransportation === 'Public Transportation');
    trips.forEach(data => { totalMiles += data.milesTraveled; });

    return (
        <Card centered link className={'vehicle-card'}>
          <Card.Content>
            <Image src='images/Bussing.jpg'/>
            <Card.Header className={'vehicle-card-header'}>
              Public Transportation
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
PublicTransportCard.propTypes = {
  userData: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default PublicTransportCard;
