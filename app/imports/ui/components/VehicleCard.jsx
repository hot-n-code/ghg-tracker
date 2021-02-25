import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/** Renders a single vehicle card. */
class VehicleCard extends React.Component {
  render() {
    const {
      year,
      make,
      model,
      logo,
      price,
      MPG,
      fuelSpending,
    } = this.props.vehicle;
    const { id } = this.props.id;
    return (
      <Link className='vehicle-card-link' to={id}>
        <div className='vehicle-card'>
          <div className='vehicle-card-container'>
            <motion.div
              className='vehicle-card-content'
              layoutId={`vehicle-card-container-${id}`}
            >
              <motion.div
                className='vehicle-card-logo'
                layoutId={`vehicle-card-logo-${id}`}
              >
                <img src={logo} alt={`${make} Logo`} />
              </motion.div>
              <motion.div
                className='vehicle-card-header'
                layoutId={`vehicle-card-header-${id}`}
              >
                {`${year} {make} {model}`}
              </motion.div>
              <motion.div
                className='vehicle-card-description'
                layoutId={`vehicle-card-price-${id}`}
              >
                <span className='vehicle-card-label'>Purchase Price: </span>$
                {`${price}`}
              </motion.div>
              <motion.div
                className='vehicle-card-description'
                layoutId={`vehicle-card-consumption-${id}`}
              >
                <span className='vehicle-card-label'>
                  Average Fuel Consumption:{' '}
                </span>
                {`${MPG}`}
              </motion.div>
              <motion.div
                className='vehicle-card-description'
                layoutId={`vehicle-card-spending-${id}`}
              >
                <span className='vehicle-card-label'>
                  Yearly Fuel Spending:{' '}
                </span>
                {`${fuelSpending}`}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    );
  }
}

/** Currently, placeholder vehicle data is passed to this component. In production, require a document to be passed to this component. */
VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
