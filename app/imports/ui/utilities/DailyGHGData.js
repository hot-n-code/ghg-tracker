/**
 * ** RENAME TO DailyGHGData.js once alt transportation has been modified **
 * DailyGHGData.js is a global document that contains the utility function that computes for a single
 * GHG Data or climate-related metrics
 */
import { _ } from 'meteor/underscore';

export const getAltTransportation = () => ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];

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
    autoMPG = (getAltTransportation().includes(modeOfTransportation) ||
        getVehicle(modeOfTransportation, userVehicles).type === 'EV/Hybrid') ?
        maxMPG : getVehicle(modeOfTransportation, userVehicles).MPG * -1;
  } else {
  // If the user has no gas vehicle (all EV/Hybrid), autoMPG is equal to the average MPG of vehicles in the US.
    autoMPG = 25;
  }

  const fuelSaved = milesTraveled / autoMPG;
  eImpactDaily.fuelSaved = ((typeof fuelSaved === 'number') ? fuelSaved : 0).toFixed(2);
  eImpactDaily.cO2Reduced = (fuelSaved * 19.6).toFixed(2);

  return eImpactDaily;
};

// DELETE THESE FUNCTIONS ONCE ALT TRANSPORTATION HAS BEEN MODIFIED
export function computeCO2Reduced(milesTraveled, modeOfTransportation, userVehicles) {
  // eslint-disable-next-line no-console
  console.log(milesTraveled, modeOfTransportation, userVehicles);
  return (0);
}

export function computeFuelSaved(milesTraveled, userVehicles, trips) {
  const avgMPG = _.reduce(userVehicles, (memo, num) => memo + num.MPG, 0) / userVehicles.length;
  let fuelSaved = ((milesTraveled / avgMPG) * trips).toFixed(2);
  if (fuelSaved === 'NaN') {
    fuelSaved = 0;
  }
  return fuelSaved;
}
