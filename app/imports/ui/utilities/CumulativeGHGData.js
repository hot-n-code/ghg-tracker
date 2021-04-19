/**
 * CumulativeGHGData.js is a global document that contains utility functions that computes for the cumulative GHG Data
 * or climate-related metrics needed for data charts and dashboards implemented in this application.
 *
 * author(s):   Daphne Marie Tapia, Sophia Elize Cruz, Timothy Huo, Chak Hon Lam
 */
import { altSelectFieldOptions } from './GlobalVariables';
import { getDailyGHG } from './DailyGHGData';

const filterDailyData = (dailyData) => {
  const filtered = {};
  filtered.reducedFiltered = dailyData.filter(({ modeType }) => modeType !== 'Gas');
  filtered.producedFiltered = dailyData.filter(({ modeType }) => modeType === 'Gas');

  return (filtered);
};

const getGHGData = (dailyData, userVehicles) => {
  const filtered = filterDailyData(dailyData);
  const computeCO2 = (array) => array.map(data => Math.abs(getDailyGHG(data.milesTraveled, data.modeOfTransportation, userVehicles).cO2Reduced))
      .reduce((a, b) => a + b, 0);
  const computeFuel = (array) => array.map(data => Math.abs(getDailyGHG(data.milesTraveled, data.modeOfTransportation, userVehicles).fuelSaved))
      .reduce((a, b) => a + b, 0);
  const computeVMT = (array) => array.map(data => data.milesTraveled)
      .reduce((a, b) => a + b, 0);
  return ({
    reducedCO2: computeCO2(filtered.reducedFiltered),
    producedCO2: computeCO2(filtered.producedFiltered),
    VMTReduced: computeVMT(filtered.reducedFiltered),
    VMTProduced: computeVMT(filtered.producedFiltered),
    fuelSaved: computeFuel(filtered.reducedFiltered),
    fuelSpent: computeFuel(filtered.producedFiltered),
  });
};

/**
 * Returns an object with attributes equal to climate-related metrics related to a specific mode of the transportation
 * @param dailyData, an array of objects or documents from the DailyUserDataCollection
 * @param mode, the mode of transportation
 *        allowed values: ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking', 'EVHybrid', 'Gas']
 * @returns {Object}
 */
export const getCumulativePerMode = (dailyData, mode, userVehicles) => {
  const ghgPerMode = {};
  let filtered;

  // Retrieves relevant user data from collection, filtered by modeOfTransportation
  if (altSelectFieldOptions.includes(mode)) {
    filtered = dailyData.filter(({ modeOfTransportation }) => modeOfTransportation === mode);
  } else if (mode === 'EVHybrid') {
    filtered = dailyData.filter(({ modeType }) => modeType === 'EV/Hybrid');
  } else { // Implies that mode === 'Gas'
    filtered = dailyData.filter(({ modeType }) => modeType === 'Gas');
  }

  const ghgData = getGHGData(filtered, userVehicles);
  ghgPerMode.cO2Reduced = ghgData.reducedCO2;
  ghgPerMode.cO2Produced = ghgData.producedCO2;
  ghgPerMode.VMTReduced = ghgData.VMTReduced;
  ghgPerMode.VMTProduced = ghgData.VMTProduced;
  ghgPerMode.fuelSaved = ghgData.fuelSaved;
  ghgPerMode.fuelSpent = ghgData.fuelSpent;
  ghgPerMode.timesUsed = filtered.length;

  return ghgPerMode;
};

/**
 * Returns an object with attributes equal to climate-related metrics based on all user/s input data
 * @param dailyData, an array of objects or documents from the DailyUserDataCollection
 * @returns {Object}
 */
export const getCumulativeGHG = (dailyData, userVehicles) => {
  const ghg = {};

  const ghgData = getGHGData(dailyData, userVehicles);
  ghg.cO2Reduced = ghgData.reducedCO2;
  ghg.cO2Produced = ghgData.producedCO2;
  ghg.VMTReduced = ghgData.VMTReduced;
  ghg.VMTProduced = ghgData.VMTProduced;
  ghg.fuelSaved = ghgData.fuelSaved;
  ghg.fuelSpent = ghgData.fuelSpent;

  return ghg;
};
