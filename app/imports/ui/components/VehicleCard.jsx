import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Header } from 'semantic-ui-react';

/** Renders a single vehicle card. */
const VehicleCard = ({ vehicle }) => {
  // State
  const [selectedId, setSelectedId] = useState(null);
  // Destructure vehicle prop object.
  const { _id, year, make, model, logo, price, MPG, fuelSpending } = vehicle;

  return (
    <AnimateSharedLayout>
      <motion.div
        className='vehicle-card'
        layoutId={_id}
        onClick={() => setSelectedId(_id)}
      >
        <div className='vehicle-card-container'>
          <motion.div
            className='vehicle-card-content'
            layoutId={`vehicle-card-container-${_id}`}
          >
            <motion.div
              className='vehicle-card-logo'
              layoutId={`vehicle-card-logo-${_id}`}
            >
              <img src={logo} alt={`${make} Logo`} />
            </motion.div>
            <motion.div
              className='vehicle-card-header'
              layoutId={`vehicle-card-header-${_id}`}
            >
              <Header as='h1'>{`${year} ${make} ${model}`}</Header>
            </motion.div>
            <motion.div
              className='vehicle-card-description'
              layoutId={`vehicle-card-price-${_id}`}
            >
              <span className='vehicle-card-label'>Purchase Price: </span>$
              {`${price}`}
            </motion.div>
            <motion.div
              className='vehicle-card-description'
              layoutId={`vehicle-card-consumption-${_id}`}
            >
              <span className='vehicle-card-label'>
                Average Fuel Consumption:{' '}
              </span>
              {`${MPG}`}
            </motion.div>
            <motion.div
              className='vehicle-card-description'
              layoutId={`vehicle-card-spending-${_id}`}
            >
              <span className='vehicle-card-label'>Yearly Fuel Spending: </span>
              {`${fuelSpending}`}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <motion.div className='vehicle-card-expand-overlay'>
            <motion.div
              className='vehicle-card-expand'
              layoutId={selectedId}
              onClick={() => setSelectedId(null)}
            >
              <motion.div className='vehicle-card-expand-logo'>
                <img src={logo} alt={`${make} Logo`} />
              </motion.div>
              <motion.div className='vehicle-card-expand-header'>
                <Header as='h1'>{`${year} ${make} ${model}`}</Header>
              </motion.div>
              <motion.div className='vehicle-card-expand-description'>
                <span className='vehicle-card-label'>Purchase Price: </span>$
                {`${price}`}
              </motion.div>
              <motion.div className='vehicle-card-expand-description'>
                <span className='vehicle-card-label'>
                  Average Fuel Consumption:{' '}
                </span>
                {`${MPG}`}
              </motion.div>
              <motion.div className='vehicle-card-expand-description'>
                <span className='vehicle-card-label'>
                  Yearly Fuel Spending:{' '}
                </span>
                {`${fuelSpending}`}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

/** Currently, placeholder vehicle data is passed to this component. In production, require a document to be passed to this component. */
VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleCard;
