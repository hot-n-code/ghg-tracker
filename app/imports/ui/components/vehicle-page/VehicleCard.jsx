import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { _ } from 'meteor/underscore';
import { Header, Button } from 'semantic-ui-react';
import {
  getVehicleYearsList,
  getVehicle,
} from '../../utilities/vehicleDropdown';
import { sampleVehicles } from '../../utilities/sampleData';

/** Renders a single vehicle card. */
const VehicleCard = ({ vehicle }) => {
  // Destructure the 'vehicle' prop.
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

  // Extract 'make' and 'year' property names
  const makeProperty = Object.keys(vehicle).find(
    property => property === 'make',
  );
  const yearProperty = Object.keys(vehicle).find(
    property => property === 'year',
  );

  // Populate vehicle comparator's dropdown values and comparator vehicle values.
  const initDropdownValues = property => {
    const sortedVehicles = _.sortBy(sampleVehicles, 'make');
    let uniqueList;

    if (property === 'make') {
      const listByMake = _.pluck(sortedVehicles, property);
      uniqueList = _.uniq(listByMake);
    } else if (property === 'year') {
      const findByModel = sortedVehicles.filter(
        vehicleObj => vehicleObj.model === sortedVehicles[0].model,
      );
      const listByYear = _.pluck(findByModel, property);
      uniqueList = _.uniq(listByYear);
      uniqueList.reverse();
      for (let i = 0; i < uniqueList.length; i++) {
        uniqueList[i] = uniqueList[i].toString();
      }
    }

    return uniqueList;
  };

  const getModelList = currentMake => {
    const filteredMakeList = _.filter(
      sampleVehicles,
      sampleVehicle => sampleVehicle.make === currentMake,
    );
    const listModel = _.pluck(filteredMakeList, 'model');
    const uniqueModels = _.uniq(listModel);
    return uniqueModels;
  };

  const getInitComparatorVehicle = () => {
    const initMakeList = initDropdownValues(makeProperty);
    const initModel = getModelList(initMakeList[0]);
    const initYear = initDropdownValues(yearProperty);
    const yearAsInt = parseInt(initYear[0], 10);
    const listModel = _.filter(
      sampleVehicles,
      sampleVehicle => sampleVehicle.model === initModel[0],
    );
    const defaultVehicle = listModel.find(
      vehicleModel => vehicleModel.year === yearAsInt,
    );
    return defaultVehicle;
  };

  // State
  const [selectedId, setSelectedId] = useState(null);
  const [makeList, setMakeList] = useState([]);
  const [dropdownYear, setDropdownYear] = useState([]);
  const [dropdownModel, setDropdownModel] = useState([]);
  const [comparatorVehicle, setComparatorVehicle] = useState(null);
  const [selectModel, setSelectModel] = useState(null);

  // Vehicle card handler
  const vehicleCardHandler = status => {
    if (status === true) {
      const initMakeList = initDropdownValues(makeProperty);
      setSelectedId(_id);
      setMakeList(initMakeList);
      setDropdownYear(initDropdownValues(yearProperty));
      setDropdownModel(getModelList(initMakeList[0]));
      setComparatorVehicle(getInitComparatorVehicle);
      setSelectModel(dropdownModel[0]);
    } else {
      setSelectedId(null);
      setMakeList([]);
      setDropdownYear([]);
      setDropdownModel([]);
      setComparatorVehicle(null);
      setSelectModel(null);
    }
  };

  // Dropdown handlers
  const dropdownYearHandler = e => {
    const yearAsInt = parseInt(e.target.value, 10);
    const newVehicle = getVehicle(yearAsInt, selectModel, sampleVehicles);

    setComparatorVehicle(newVehicle);
  };

  const dropdownMakeHandler = e => {
    const modelList = getModelList(e.target.value);
    const yearList = getVehicleYearsList(modelList[0], sampleVehicles);
    const newVehicle = getVehicle(
      parseInt(yearList[0], 10),
      modelList[0],
      sampleVehicles,
    );

    setComparatorVehicle(newVehicle);
    setDropdownYear(yearList);
    setDropdownModel(modelList);
    setSelectModel(modelList[0]);
  };

  const dropdownModelHandler = e => {
    const yearList = getVehicleYearsList(e.target.value, sampleVehicles);
    const yearAsInt = parseInt(yearList[0], 10);
    const newVehicle = getVehicle(yearAsInt, e.target.value, sampleVehicles);
    setSelectModel(e.target.value);
    setDropdownYear(yearList);
    setComparatorVehicle(newVehicle);
  };

  return (
    <AnimateSharedLayout type='crossfade'>
      <motion.div
        className='vehicle-card'
        layoutId={_id}
        whileHover={{
          scale: 1.04,
          boxShadow: '-4px 7px 2px rgba(0, 0, 0, 0.2)',
        }}
        onClick={() => vehicleCardHandler(true)}
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
              {type === 'EV/Hybrid' ? (
                <span>EV/Hybrid</span>
              ) : (
                <span>{`${MPG}`} MPG</span>
              )}
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
              <Button color='black' onClick={() => setSelectedId(_id)}>
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
                onClick={() => vehicleCardHandler(false)}
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
                          {type === 'EV/Hybrid' ? (
                            <td>EV/Hybrid</td>
                          ) : (
                            <td>{`${MPG}`} MPG</td>
                          )}
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
                          src={comparatorVehicle.logo}
                          alt={`${comparatorVehicle.make} Logo`}
                        />
                      </motion.div>
                      <motion.div className='vehicle-card-expand-header'>
                        <Header as='h1'>
                          <select
                            className='vehicle-card-dropdown'
                            onChange={dropdownYearHandler}
                          >
                            {dropdownYear.map((yearOption, key) => (
                              <option
                                className='vehicle-card-dropdown-option'
                                value={yearOption}
                                key={key}
                              >
                                {yearOption}
                              </option>
                            ))}
                          </select>
                          <select
                            className='vehicle-card-dropdown'
                            onChange={dropdownMakeHandler}
                          >
                            {makeList.map((makeOption, key) => (
                              <option
                                className='vehicle-card-dropdown-option'
                                value={makeOption}
                                key={key}
                              >
                                {makeOption}
                              </option>
                            ))}
                          </select>
                          <select
                            className='vehicle-card-dropdown'
                            onChange={dropdownModelHandler}
                          >
                            {dropdownModel.map((modelOption, key) => (
                              <option
                                className='vehicle-card-dropdown-option'
                                value={modelOption}
                                key={key}
                              >
                                {modelOption}
                              </option>
                            ))}
                          </select>
                        </Header>
                      </motion.div>
                    </div>
                    <motion.table className='vehicle-card-expand-stats'>
                      <tbody>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Purchase Price:
                          </td>
                          <td>${`${comparatorVehicle.price}`}</td>
                        </motion.tr>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Avg. Fuel Consumption:
                          </td>
                          <td>EV/Hybrid</td>
                        </motion.tr>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Yearly Fuel Spending:
                          </td>
                          <td>${`${comparatorVehicle.fuelSpending}`}</td>
                        </motion.tr>
                        <motion.tr>
                          <td className='vehicle-card-expand-label'>
                            Vehicle Type:
                          </td>
                          <td>{`${comparatorVehicle.type}`}</td>
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
