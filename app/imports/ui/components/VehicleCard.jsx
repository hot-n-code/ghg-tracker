import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VehicleCard extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <h1>BRAND LOGO</h1>
          <Card.Header>BRAND NAME</Card.Header>
          <Card.Meta>MODEL</Card.Meta>
          <Card.Description>Avg. Fuel Consumption: 25 MPG</Card.Description>
        </Card.Content>
        <Card.Content extra>Show More</Card.Content>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
VehicleCard.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(VehicleCard);
