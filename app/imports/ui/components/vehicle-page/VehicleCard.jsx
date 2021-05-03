import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { _ } from 'meteor/underscore';
import { Header, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import {
  getVehicleYearsList,
  getVehicle,
} from '../../utilities/vehicleDropdown';
import { userVehicleRemoveItMethod } from '../../../api/user/UserVehicleCollection.methods';
import { VehicleMakes } from '../../../api/vehicle/VehicleMakeCollection';

/** Renders a single vehicle card. */
const VehicleCard = ({ vehicle, allEVHybridVehicles, vehicleMakes }) => {
  // Destructure the 'vehicle' prop.
  const {
    _id,
    name,
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
    let uniqueList;

    if (property === 'make') {
      const listByMake = _.pluck(allEVHybridVehicles, 'Make');
      uniqueList = _.uniq(listByMake);
    } else if (property === 'year') {
      const findByModel = allEVHybridVehicles.filter(
        vehicleObj => vehicleObj.Model === allEVHybridVehicles[0].Model,
      );
      const listByYear = _.pluck(findByModel, 'Year');
      uniqueList = _.uniq(listByYear);
      uniqueList.reverse();
      for (let i = 0; i < uniqueList.length; i++) {
        uniqueList[i] = uniqueList[i].toString();
      }
    }

    return uniqueList;
  };

  const getModelList = currentMake => {
    const filteredMakeList = allEVHybridVehicles.filter(
      obj => obj.Make === currentMake,
    );
    const listModel = _.pluck(filteredMakeList, 'Model');
    const uniqueModels = _.uniq(listModel);
    return uniqueModels;
  };

  const getInitComparatorVehicle = () => {
    const initMakeList = initDropdownValues(makeProperty);
    const initModel = getModelList(initMakeList[0]);
    const initYear = initDropdownValues(yearProperty);
    const yearAsInt = parseInt(initYear[0], 10);
    const listModel = allEVHybridVehicles.filter(
      obj => obj.Model === initModel[0],
    );
    const defaultVehicle = listModel.find(
      vehicleModel => vehicleModel.Year === yearAsInt,
    );
    defaultVehicle.type = defaultVehicle.Mpg < 0 ? 'EV/Hybrid' : 'Gas';
    defaultVehicle.logo = vehicleMakes.find(
      obj => obj.make === defaultVehicle.Make,
    ).logo;
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

  // Delete button handler
  const onClickDeleteHandler = () => {
    swal('Success', 'Vehicle deleted successfully', 'success');
    userVehicleRemoveItMethod.call(vehicle._id);
  };

  // Dropdown handlers
  const dropdownYearHandler = e => {
    const yearAsInt = parseInt(e.target.value, 10);
    const newVehicle = getVehicle(yearAsInt, selectModel, allEVHybridVehicles);
    newVehicle.type = newVehicle.Mpg < 0 ? 'EV/Hybrid' : 'Gas';
    newVehicle.logo = vehicleMakes.find(
      obj => obj.make === newVehicle.Make,
    ).logo;

    setComparatorVehicle(newVehicle);
  };

  const dropdownMakeHandler = e => {
    const modelList = getModelList(e.target.value);
    const yearList = getVehicleYearsList(modelList[0], allEVHybridVehicles);
    const newVehicle = getVehicle(
      parseInt(yearList[0], 10),
      modelList[0],
      allEVHybridVehicles,
    );
    newVehicle.type = newVehicle.Mpg < 0 ? 'EV/Hybrid' : 'Gas';
    newVehicle.logo = vehicleMakes.find(
      obj => obj.make === newVehicle.Make,
    ).logo;

    setComparatorVehicle(newVehicle);
    setDropdownYear(yearList);
    setDropdownModel(modelList);
    setSelectModel(modelList[0]);
  };

  const dropdownModelHandler = e => {
    const yearList = getVehicleYearsList(e.target.value, allEVHybridVehicles);
    const yearAsInt = parseInt(yearList[0], 10);
    const newVehicle = getVehicle(
      yearAsInt,
      e.target.value,
      allEVHybridVehicles,
    );
    newVehicle.type = newVehicle.Mpg < 0 ? 'EV/Hybrid' : 'Gas';
    newVehicle.logo = vehicleMakes.find(
      obj => obj.make === newVehicle.Make,
    ).logo;

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
          scale: 1.02,
          boxShadow: '-4px 7px 2px rgba(0, 0, 0, 0.2)',
        }}
        whileTap={{
          backgroundColor: 'rgb(220, 220, 220)',
        }}
      >
        <motion.div
          className='vehicle-card-btn-container'
          layoutId={`vehicle-card-btn-container-${_id}`}
        >
          <button
            className='vehicle-card-btn-del'
            onClick={onClickDeleteHandler}
          >
            Delete
          </button>
        </motion.div>
        <div
          className='vehicle-card-container'
          onClick={() => vehicleCardHandler(true)}
        >
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
              {name === `${year} ${make} ${model}` ? (
                <Header as='h2'>{`${year} ${make} ${model}`}</Header>
              ) : (
                <>
                  <Header
                    as='h2'
                    className='vehicle-card-header-name'
                  >{`${name}'s`}</Header>
                  <Header
                    as='h2'
                    className='vehicle-card-header-vehicle'
                  >{`${year} ${make} ${model}`}</Header>
                </>
              )}
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
                        <Header as='h2'>{`${year} ${make} ${model}`}</Header>
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
                        <Header as='h2'>
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
                          {comparatorVehicle.price ? (
                            <td>${`${comparatorVehicle.price}`}</td>
                          ) : (
                            <td>No current owners.</td>
                          )}
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
                          {comparatorVehicle.fuelSpending ? (
                            <td>${`${comparatorVehicle.fuelSpending}`}</td>
                          ) : (
                            <td>No current owners.</td>
                          )}
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
  allEVHybridVehicles: PropTypes.array.isRequired,
  vehicleMakes: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const ready = VehicleMakes.subscribeVehicleMake().ready();
  const vehicleMakes = VehicleMakes.find({}).fetch();
  return {
    ready,
    vehicleMakes,
  };
})(VehicleCard);
