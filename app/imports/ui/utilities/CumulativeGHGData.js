/**
 * CumulativeGHGData.js is a global document that contains utility functions that computes for the cumulative GHG Data
 * or climate-related metrics needed for data charts and dashboards implemented in this application.
 *
 * author(s):   Daphne Marie Tapia, Sophia Elize Cruz, Timothy Huo, Chak Hon Lam
 */
import { altSelectFieldOptions } from './GlobalVariables';
import { getDailyGHG } from './DailyGHGData';

const getVMTReduced = (dailyData) => dailyData.filter(({ modeType }) => modeType !== 'Gas')
      .map(data => data.milesTraveled)
      .reduce((a, b) => a + b, 0);

const getCO2Data = (dailyData, userVehicles) => {
  const reducedFiltered = dailyData.filter(({ modeType }) => modeType !== 'Gas');
  const producedFiltered = dailyData.filter(({ modeType }) => modeType === 'Gas');

  const compute = (array) => array.map(data => getDailyGHG(data.milesTraveled, data.modeOfTransportation, userVehicles).cO2Reduced)
      .reduce((a, b) => a + b, 0);

  return ({
    reduced: compute(reducedFiltered),
    produced: compute(producedFiltered),
  });
};

const getFuelSavedTotal = (dailyData, userVehicles) => dailyData.filter(({ modeType }) => modeType !== 'Gas')
    .map(data => getDailyGHG(data.milesTraveled, data.modeOfTransportation, userVehicles).fuelSaved)
    .reduce((a, b) => a + b, 0);

/**
 * Returns an object with attributes equal to climate-related metrics related to a specific mode of the transportation
 * @param dailyData, an array of objects or documents from the DailyUserDataCollection
 * @param mode, the mode of transportation
 *        allowed values: ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking', 'EVHybrid', 'Gas']
 * @returns {Object}
 */
export const getCumulativePerMode = (dailyData, mode, userVehicles) => {
  const eImpactPerMode = {};
  let filtered;

  // Retrieves relevant user data from collection, filtered by modeOfTransportation
  if (altSelectFieldOptions.includes(mode)) {
    filtered = dailyData.filter(({ modeOfTransportation }) => modeOfTransportation === mode);
  } else if (mode === 'EVHybrid') {
    filtered = dailyData.filter(({ modeType }) => modeType === 'EV/Hybrid');
  } else { // Implies that mode === 'Gas'
    filtered = dailyData.filter(({ modeType }) => modeType === 'Gas');
  }

  const cO2Data = getCO2Data(filtered, userVehicles);
  if (mode === 'Gas') {
    eImpactPerMode.cO2Reduced = cO2Data.reduced;
    eImpactPerMode.cO2Produced = Math.abs(cO2Data.produced);
    eImpactPerMode.VMTReduced = 0;
    eImpactPerMode.fuelSaved = 0;
  } else {
    eImpactPerMode.cO2Reduced = cO2Data.reduced;
    eImpactPerMode.cO2Produced = Math.abs(cO2Data.produced);
    eImpactPerMode.VMTReduced = getVMTReduced(filtered);
    eImpactPerMode.fuelSaved = getFuelSavedTotal(filtered, userVehicles);
  }
  eImpactPerMode.timesUsed = filtered.length;

  return eImpactPerMode;
};

/**
 * Returns an object with attributes equal to climate-related metrics based on all user/s input data
 * @param dailyData, an array of objects or documents from the DailyUserDataCollection
 * @returns {Object}
 */
export const getCumulativeGHG = (dailyData, userVehicles) => {
  const eImpact = {};


  const cO2Data = getCO2Data(dailyData, userVehicles);
  eImpact.cO2Reduced = cO2Data.reduced;
  eImpact.cO2Produced = Math.abs(cO2Data.produced);
  eImpact.VMTReduced = getVMTReduced(dailyData);
  eImpact.fuelSaved = getFuelSavedTotal(dailyData, userVehicles);

  return eImpact;
};
