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

  let cO2Reduced = (milesTraveled / autoMPG) * 19.6;
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
