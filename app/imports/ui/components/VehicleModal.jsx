import React from 'react';
// import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single vehicle card. */
class VehicleModal extends React.Component {
  render() {
    return (
      <div className='modal'>
        <h1>placeholder</h1>
      </div>
    );
  }
}

/** Currently, placeholder vehicle data is passed to this component. In production, require a document to be passed to this component. */
VehicleModal.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(VehicleModal);
