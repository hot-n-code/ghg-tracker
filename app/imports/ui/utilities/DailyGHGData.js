/**
 * DailyGHGData.js is a global document that contains the utility function that computes for a single
 * GHG Data or climate-related metrics
 *
 * author(s):   Daphne Marie Tapia, Chak Hon Lam
 */
import { _ } from 'meteor/underscore';
import { altTransportation, averageAutoMPG, gHGPerGallon, kmToMiFactor } from './GlobalVariables';

/**
 * Returns an object with attributes equal to climate-related metrics based on the user input data
 * @param milesTraveled, number of miles traveled by the user
 * @param modeOfTransportation, mode of transportation used
 * @param userVehicles, all vehicles owned by current user
 * @returns {Object}
 */
export const getDailyGHG = (milesTraveled, modeOfTransportation, userVehicles) => {
  const eImpactDaily = {};

  // get max MPG (replace with favorite car's MPG later)
  const maxMPG = _.max(userVehicles, (vehicle) => vehicle.MPG).MPG;
  let autoMPG;

  function getVehicle(makeModel, vehicles) {
    return (vehicles.find(({ make, model }) => makeModel === (`${make} ${model}`)));
  }

  // If the user has a regular gas vehicle,
  if (maxMPG > 0) {
    autoMPG = (altTransportation.includes(modeOfTransportation) ||
        getVehicle(modeOfTransportation, userVehicles).type === 'EV/Hybrid') ?
        maxMPG : -getVehicle(modeOfTransportation, userVehicles).MPG;
  } else {
  // If the user has no gas vehicle (all EV/Hybrid), autoMPG is equal to the average MPG of vehicles in the US.
    autoMPG = averageAutoMPG;
  }

  const fuelSaved = milesTraveled / autoMPG;
  eImpactDaily.fuelSaved = ((typeof fuelSaved === 'number') ? fuelSaved : 0).toFixed(2);
  eImpactDaily.cO2Reduced = (fuelSaved * gHGPerGallon).toFixed(2);

  return eImpactDaily;
};

/**
 * Returns the value of the distance traveled in miles
 * @param distanceTraveled, number of distance traveled by user
 * @param unit, distance unit: mi - miles, km - kilometers
 * @returns {*|number}
 */
export const getMilesTraveled = (distanceTraveled, unit) => ((unit === 'mi') ?
    distanceTraveled : distanceTraveled * kmToMiFactor);
