/**
 * DailyGHGData.js is a global document that contains the utility function that computes for a single
 * GHG Data or climate-related metrics
 *
 * author(s):   Daphne Marie Tapia, Chak Hon Lam
 */
import { _ } from 'meteor/underscore';
import {
  altSelectFieldOptions,
  averageAutoMPG,
  gHGPerGallon,
  kmToMiFactor,
  miToKmFactor,
} from './GlobalVariables';

/**
 * Returns the corresponding vehicle given its make and model string form
 * @param makeModel, a string containing a vehicle's make and model
 * @param userVehicles, all vehicles owned by current user
 * @returns {vehicle}
 */
export const getVehicle = (makeModel, userVehicles) => (userVehicles.find(({ name }) => makeModel === (`${name}`)));

/**
 *
 * @param modeOfTransportation, mode of transportation used
 * @param userVehicles, all vehicles owned by current user
 * @returns {string|['Alt','Gas','EV/Hybrid']}
 */
export const getModeType = (modeOfTransportation, userVehicles) => ((altSelectFieldOptions.includes(modeOfTransportation)) ?
      'Alt' : getVehicle(modeOfTransportation, userVehicles).type);

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

  // If the user has a regular gas vehicle,
  if (maxMPG > 0) {
    autoMPG = (getModeType(modeOfTransportation, userVehicles) === 'Gas') ?
        -getVehicle(modeOfTransportation, userVehicles).MPG : maxMPG;
  } else {
  // If the user has no gas vehicle (all EV/Hybrid), autoMPG is equal to the average MPG of vehicles in the US.
    autoMPG = averageAutoMPG;
  }

  const fuelSaved = milesTraveled / autoMPG;
  eImpactDaily.fuelSaved = Number(((typeof fuelSaved === 'number') ? fuelSaved : 0).toFixed(2));
  eImpactDaily.cO2Reduced = Number((fuelSaved * gHGPerGallon).toFixed(2));

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

/**
 * Returns the value of the distance traveled in kilometers
 * @param distanceTraveled, number of distance traveled by user
 * @param unit, distance unit: mi - miles, km - kilometers
 * @returns {*|number}
 */
export const getKilometersTraveled = (distanceTraveled, unit) => ((unit === 'km') ?
    distanceTraveled : distanceTraveled * miToKmFactor);

/**
 * Returns today's date, used in add/edit daily data forms
 */
export const getDateToday = () => {
  const today = new Date();
  today.setHours(11, 59, 59, 99);

  return today;
};
