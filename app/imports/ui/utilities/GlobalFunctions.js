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

export function getVehicleYearsList(model, vehicleList) {
  const filteredVehicles = vehicleList.filter(
    vehicle => vehicle.model === model,
  );
  const listYear = _.pluck(filteredVehicles, 'year');
  const listUniqueYear = _.uniq(listYear);
  const reverseList = _.sortBy(listUniqueYear, year => year * -1);

  for (let i = 0; i < reverseList.length; i++) {
    reverseList[i] = reverseList[i].toString();
  }

  return reverseList;
}

export function getVehicle(year, model, vehicleList) {
  const filterByModel = vehicleList.filter(vehicle => vehicle.model === model);
  const vehicle = filterByModel.find(
    selectVehicle => selectVehicle.year === year,
  );
  return vehicle;
}
