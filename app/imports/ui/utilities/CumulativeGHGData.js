/**
 * CumulativeGHGData.js is a global document that contains utility functions that computes for the cumulative GHG Data
 * or climate-related metrics needed for data charts and dashboards implemented in this application.
 *
 * collaborator(s):   Daphne Marie Tapia,Sophia Elize Cruz, Timothy Huo, Chak Hon Lam
 */

import { getAltTransportation } from './DailyGHGData';

// Array.prototype.reduce functions used by both getCumulativePerMode(collection, mode) and getCumulativeGHG(collection)
const sumCO2Reduced = (array) => array.reduce((accumulator, data) => accumulator + data.cO2Reduced, 0).toFixed(2);
const sumMiles = (array) => array.reduce((accumulator, data) => accumulator + data.milesTraveled, 0).toFixed(2);
const sumFuelSaved = (array) => array.reduce((accumulator, data) => accumulator + data.fuelSaved, 0).toFixed(2);

/**
 * Returns an object with attributes equal to climate-related metrics related to a specific mode of the transportation
 * @param collection, an array of objects or documents from the DailyUserDataCollection
 * @param mode, the mode of transportation
 *        allowed values: ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking', 'EVHybrid', 'Gas']
 * @returns {Object}
 */
export const getCumulativePerMode = (collection, mode) => {
  const transpoData = {};
  let filtered;

  // retrieves relevant user data from collection, filtered by modeOfTransportation
  if (getAltTransportation().includes(mode)) {
    filtered = collection.filter(({ modeOfTransportation }) => modeOfTransportation === mode);
  } else if (mode === 'EVHybrid') {
    filtered = collection.filter(({ modeOfTransportation, co2Reduced }) => modeOfTransportation !== mode
        && co2Reduced >= 0);
  // implies that mode === 'Gas'
  } else {
    filtered = collection.filter(({ cO2Reduced }) => cO2Reduced < 0);
  }

  const computeCO2 = sumCO2Reduced(filtered);
  if (computeCO2 < 0) {
    transpoData.cO2Produced = Math.abs(computeCO2);
  } else {
    transpoData.cO2Reduced = computeCO2;
    transpoData.VMTReduced = sumMiles(filtered);
    transpoData.fuelSaved = sumFuelSaved(filtered);
  }
  transpoData.timesUsed = filtered.length;

  return transpoData;
};

/**
 * Returns an object with attributes equal to climate-related metrics based on all user/s input data
 * @param collection, an array of objects or documents from the DailyUserDataCollection
 * @returns {Object}
 */
export const getCumulativeGHG = (collection) => {
  const eImpact = {};

  const altTransportation = collection.filter(({ cO2Reduced }) => cO2Reduced >= 0);

  eImpact.cO2Reduced = sumCO2Reduced(altTransportation);
  const cO2Produced = getCumulativePerMode(collection, 'Gas').cO2Produced;
  eImpact.cO2Produced = (typeof cO2Produced === 'number') ? cO2Produced : 0;
  eImpact.VMTReduced = sumMiles(altTransportation);
  eImpact.fuelSaved = sumFuelSaved(altTransportation);

  return eImpact;
};
