import { _ } from 'meteor/underscore';

export function getAltTransportation() {
  return ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];
}

export function computeCO2Reduced(milesTraveled, modeOfTransportation, userVehicles) {
  // get max MPG (replace with favorite car's MPG later)
  const maxMPG = _.max(userVehicles, (vehicle) => vehicle.MPG).MPG;
  let autoMPG;

  function getVehicle(makeModel, vehicles) {
    return (_.find(vehicles, (vehicle) => makeModel === (`${vehicle.make} ${vehicle.model}`)));
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

  let cO2Reduced = ((milesTraveled / autoMPG) * 19.6).toFixed(2);
  if (cO2Reduced === 'NaN') {
    cO2Reduced = 0;
  }
  return cO2Reduced;
}

export function computeFuelSaved(milesTraveled, userVehicles, trips) {
  const avgMPG = _.reduce(userVehicles, (memo, num) => memo + num.MPG, 0) / userVehicles.length;
  let fuelSaved = ((milesTraveled / avgMPG) * trips).toFixed(2);
  if (fuelSaved === 'NaN') {
    fuelSaved = 0;
  }
  return fuelSaved;
}

// Calculates cumulative miles Traveled, cO2Reduced, cO2Produced, and gasSaved.
// Returns an object of 4 attributes that can be accessed using dot notation
export function CalculateCumulative(collection) {
  const sumData = (arr, key) => _.reduce(_.pluck(arr, key), function (sum, num) { return sum + num; }, 0).toFixed(1);

  const altTransportation = ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];
  const userData = collection;
  console.log(userData);
  const eImpact = {
    milesTraveled: 0,
    cO2Reduced: 0,
    cO2Produced: 0,
    GasSaved: 0,
  };
  const altData = [];
  const gasData = [];
  let x = 0;
  let i = 0;
  userData.map((collectionData) => {
    if (altTransportation.includes(collectionData.modeOfTransportation)) {
      altData[i] = collectionData;
      i++;
    } else if (collectionData.cO2Reduced > 0) {
      altData[i] = collectionData;
      i++;
    } else if (collectionData.cO2Reduced < 0) {
      gasData[x] = collectionData;
      x++;
    }
    return altData;
  });
  eImpact.milesTraveled = sumData(altData, 'milesTraveled');
  eImpact.cO2Reduced = sumData(altData, 'cO2Reduced');
  eImpact.GasSaved = (eImpact.milesTraveled / 20).toFixed(1);
  eImpact.cO2Produced = sumData(gasData, 'cO2Reduced') * -1;
  return eImpact;
}
