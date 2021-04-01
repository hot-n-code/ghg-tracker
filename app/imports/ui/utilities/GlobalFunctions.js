import { _ } from 'meteor/underscore';

export function getAltTransportation() {
  return ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];
}

export function computeCO2Reduced(
  milesTraveled,
  modeOfTransportation,
  userVehicles,
) {
  const autoMPG = getAltTransportation().includes(modeOfTransportation)
    ? _.max(userVehicles, vehicle => vehicle.MPG).MPG
    : _.find(userVehicles, vehicle => vehicle.make === modeOfTransportation)
        .MPG * -1;
  return ((milesTraveled / autoMPG) * 19.6).toFixed(2);
}
