/**
 * DailyGHGData.js is a global document that contains the utility function that computes for a single
 * GHG Data or climate-related metrics
 *
 * author(s):   Daphne Marie Tapia, Chak Hon Lam
 */
import { _ } from 'meteor/underscore';

// Common conversion factor of 8,887 grams of CO2 emissions per gallon of gasoline consumed (Federal Register 2010)
export const gHGPerGallon = 19.6;

// The weighted average combined fuel economy for cars and light trucks in 2017 (FHWA 2019)
// Read more: https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
export const averageAutoMPG = 22.3;

// An array of all the Alternative Transportation modes that are not EV/Hybrid vehicles
export const altTransportation = ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];

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
