import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Header, Button } from 'semantic-ui-react';
import { sampleVehicles } from '../utilities/sampleData.js';

/** Renders a single vehicle card. */
const VehicleCard = ({ vehicle }) => {
  const {
    _id,
    year,
    make,
    model,
    logo,
    price,
    MPG,
    fuelSpending,
    type,
  } = vehicle;

  // State
  const [selectedId, setSelectedId] = useState(null);

  return (
    <AnimateSharedLayout type='crossfade'>
      <motion.div
        className='vehicle-card'
        layoutId={_id}
        whileHover={{
          scale: 1.04,
          boxShadow: '-4px 7px 2px rgba(0, 0, 0, 0.2)',
        }}
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
                Avg. Fuel Consumption:{' '}
              </span>
              {`${MPG}`} MPG
            </motion.div>
            <motion.div
              className='vehicle-card-description'
              layoutId={`vehicle-card-spending-${_id}`}
            >
              <span className='vehicle-card-label'>Yearly Fuel Spending: </span>
              ${`${fuelSpending}`}
            </motion.div>
            <motion.div
              className='vehicle-card-btn'
              layoutId={`vehicle-card-btn-${_id}`}
            >
              <Button inverted color='green' onClick={() => setSelectedId(_id)}>
                Compare
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <motion.div className='vehicle-card-expand-overlay'>
            <motion.div className='vehicle-card-expand' layoutId={selectedId}>
              <motion.p
                className='vehicle-card-expand-close-btn'
                onClick={() => setSelectedId(null)}
              >
                &#10005;
              </motion.p>
              <motion.div className='vehicle-card-expand-container'>
                <motion.div className='vehicle-card-expand-col'>
                  <motion.div className='vehicle-card-expand-content-wrapper'>
                    <div className='vehicle-card-expand-header-wrapper'>
                      <motion.div className='vehicle-card-expand-logo'>
                        <img src={logo} alt={`${make} Logo`} />
                      </motion.div>
                      <motion.div className='vehicle-card-expand-header'>
                        <Header as='h1'>{`${year} ${make} ${model}`}</Header>
                      </motion.div>
                    </div>
                    <motion.table className='vehicle-card-expand-stats'>
                      <tbody>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Purchase Price:
                          </td>
                          <td>${`${price}`}</td>
                        </motion.tr>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Avg. Fuel Consumption:
                          </td>
                          <td>{`${MPG}`} MPG</td>
                        </motion.tr>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Yearly Fuel Spending:
                          </td>
                          <td>${`${fuelSpending}`}</td>
                        </motion.tr>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Vehicle Type:
                          </td>
                          <td>{`${type}`}</td>
                        </motion.tr>
                      </tbody>
                    </motion.table>
                  </motion.div>
                </motion.div>
                <motion.div className='vehicle-card-expand-col'>
                  <motion.div className='vehicle-card-expand-content-wrapper'>
                    <div className='vehicle-card-expand-header-wrapper'>
                      <motion.div className='vehicle-card-expand-logo'>
                        <img
                          src={sampleVehicles[0].logo}
                          alt={`${sampleVehicles[0].make} Logo`}
                        />
                      </motion.div>
                      <motion.div className='vehicle-card-expand-header'>
                        <Header as='h1'>{`${sampleVehicles[0].year} ${sampleVehicles[0].make} ${sampleVehicles[0].model}`}</Header>
                      </motion.div>
                    </div>
                    <motion.table className='vehicle-card-expand-stats'>
                      <tbody>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Purchase Price:
                          </td>
                          <td>${`${sampleVehicles[0].price}`}</td>
                        </motion.tr>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Avg. Fuel Consumption:
                          </td>
                          <td>{`${sampleVehicles[0].MPG}`} MPG</td>
                        </motion.tr>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Yearly Fuel Spending:
                          </td>
                          <td>${`${sampleVehicles[0].fuelSpending}`}</td>
                        </motion.tr>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Vehicle Type:
                          </td>
                          <td>{`${sampleVehicles[0].type}`}</td>
                        </motion.tr>
                      </tbody>
                    </motion.table>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

/** Individual vehicle data is passed in as an object in props. */
VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleCard;
