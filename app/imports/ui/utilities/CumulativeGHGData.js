/**
 * CumulativeGHGData.js is a global document that contains utility functions that computes for the cumulative GHG Data
 * or climate-related metrics needed for data charts and dashboards implemented in this application.
 *
 * author(s):   Daphne Marie Tapia, Sophia Elize Cruz, Timothy Huo, Chak Hon Lam
 */
import { altSelectFieldOptions } from './GlobalVariables';
import { getDailyGHG } from './DailyGHGData';

// Array.prototype.reduce functions used by both getCumulativePerMode(collection, mode) and getCumulativeGHG(collection)
const sumMiles = (array) => array.reduce((accumulator, data) => accumulator + data.milesTraveled, 0).toFixed(2);
const getCO2ReducedTotal = (dailyData, userVehicles) => dailyData.map(data => getDailyGHG(data.milesTraveled, data.modeOfTransportation, userVehicles).cO2Reduced)
    .reduce((a, b) => a + b, 0);
const getFuelSavedTotal = (dailyData, userVehicles) => dailyData.map(data => getDailyGHG(data.milesTraveled, data.modeOfTransportation, userVehicles).fuelSaved)
    .reduce((a, b) => a + b, 0);

/**
 * Returns an object with attributes equal to climate-related metrics related to a specific mode of the transportation
 * @param dailyData, an array of objects or documents from the DailyUserDataCollection
 * @param mode, the mode of transportation
 *        allowed values: ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking', 'EVHybrid', 'Gas']
 * @returns {Object}
 */
export const getCumulativePerMode = (dailyData, mode, userVehicles) => {
  const transportationData = {};
  let filtered;

  // Retrieves relevant user data from collection, filtered by modeOfTransportation
  if (altSelectFieldOptions.includes(mode)) {
    filtered = dailyData.filter(({ modeOfTransportation }) => modeOfTransportation === mode);
  } else if (mode === 'EVHybrid') {
    filtered = dailyData.filter(({ modeType }) => modeType === 'EV/Hybrid');
  } else { // Implies that mode === 'Gas'
    filtered = dailyData.filter(({ modeType }) => modeType === 'Gas');
  }

  const computeCO2 = getCO2ReducedTotal(filtered, userVehicles);
  if (computeCO2 < 0) {
    transportationData.cO2Produced = Math.abs(computeCO2);
  } else {
    transportationData.cO2Reduced = computeCO2;
    transportationData.VMTReduced = sumMiles(filtered);
    transportationData.fuelSaved = getFuelSavedTotal(filtered, userVehicles);
  }
  transportationData.timesUsed = filtered.length;

  return transportationData;
};

/**
 * Returns an object with attributes equal to climate-related metrics based on all user/s input data
 * @param dailyData, an array of objects or documents from the DailyUserDataCollection
 * @returns {Object}
 */
export const getCumulativeGHG = (dailyData, userVehicles) => {
  const eImpact = {};

  const altTransportationData = dailyData.filter(({ cO2Reduced }) => cO2Reduced >= 0);

  eImpact.cO2Reduced = getCO2ReducedTotal(dailyData, userVehicles);
  const cO2Produced = getCumulativePerMode(dailyData, 'Gas').cO2Produced;
  eImpact.cO2Produced = Number(((typeof cO2Produced === 'number') ? cO2Produced : 0).toFixed(2));
  eImpact.VMTReduced = sumMiles(altTransportationData);
  eImpact.fuelSaved = getFuelSavedTotal(dailyData, userVehicles);

  return eImpact;
};
