import { getAltTransportation } from './GlobalFunctions';

// functions used by both cumulative functions
const sumCO2Reduced = (array) => array.reduce((accumulator, data) => accumulator + data.cO2Reduced, 0).toFixed(2);
const sumMiles = (array) => array.reduce((accumulator, data) => accumulator + data.milesTraveled, 0).toFixed(2);
const sumFuelSaved = (array, trips) => (((array.VMTReduced / array.cO2Reduced) * 19.6) * trips).toFixed(2);



// gets the total GHG Data for the specified mode of transportation
export function getCumulativePerMode(collection, mode) {
  const transpoData = {};
  let filtered;

  // retrieves relevant user data from collection, filtered by modeOfTransportation
  if (getAltTransportation().includes(mode)) {
    filtered = collection.filter(({ modeOfTransportation }) => modeOfTransportation === mode);
  } else if (mode === 'EVHybrid') {
    filtered = collection.filter(({ modeOfTransportation, co2Reduced }) => modeOfTransportation !== mode
        && co2Reduced >= 0);
  } else {
    filtered = collection.filter(({ cO2Reduced }) => cO2Reduced < 0);
  }

  const trips = filtered.length;
  const computeCO2 = sumCO2Reduced(filtered);
  if (computeCO2 < 0) {
    transpoData.cO2Produced = Math.abs(computeCO2);
  } else {
    transpoData.cO2Reduced = computeCO2;
    transpoData.VMTReduced = sumMiles(filtered);
    transpoData.fuelSaved = sumFuelSaved(transpoData, trips);
  }
  transpoData.timesUsed = filtered.length;

  if (transpoData.fuelSaved === 'NaN') {
    transpoData.fuelSaved = 0;
  }

  return transpoData;
}

// gets the total GHG Data for individual or all users depending on the collection sent
export function getCumulativeGHG(collection) {
  const eImpact = {};

  const altTransportation = collection.filter(({ cO2Reduced }) => cO2Reduced >= 0);
  const trips = altTransportation.length;

  eImpact.cO2Reduced = sumCO2Reduced(altTransportation);
  eImpact.cO2Produced = getCumulativePerMode(collection, 'Gas').cO2Produced;
  eImpact.VMTReduced = sumMiles(altTransportation);
  eImpact.fuelSaved = sumFuelSaved(eImpact, trips);
  if (eImpact.fuelSaved === 'NaN') {
    eImpact.fuelSaved = 0;
  }
  return eImpact;
}
