import { _ } from 'meteor/underscore';

export function getAltTransportation() {
  return ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];
}

export function computeCO2Reduced(milesTraveled, modeOfTransportation, userVehicles) {
  const autoMPG = getAltTransportation().includes(modeOfTransportation) ?
      (_.max(userVehicles, (vehicle) => vehicle.MPG)).MPG :
      _.find(userVehicles, (vehicle) => vehicle.make === modeOfTransportation).MPG * -1;
  let CO2Reduced = ((milesTraveled / autoMPG) * 19.6).toFixed(2);
  if (CO2Reduced === 'NaN') {
    CO2Reduced = 0;
  }
  return CO2Reduced;
}

export function computeFuelSaved(milesTraveled, userVehicles, trips) {
  const avgMPG = _.reduce(userVehicles, (memo, num) => memo + num.MPG, 0) / userVehicles.length;
  let fuelSaved = ((milesTraveled / avgMPG) * trips).toFixed(2);
  if (fuelSaved === 'NaN') {
    fuelSaved = 0;
  }
  return fuelSaved;
}
