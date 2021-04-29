import { _ } from 'meteor/underscore';

export function getVehicleYearsList(model, vehicleList) {
  const filteredVehicles = vehicleList.filter(
    vehicle => vehicle.Model === model,
  );
  const listYear = _.pluck(filteredVehicles, 'Year');
  const listUniqueYear = _.uniq(listYear);
  const reverseList = _.sortBy(listUniqueYear, year => year * -1);

  for (let i = 0; i < reverseList.length; i++) {
    reverseList[i] = reverseList[i].toString();
  }

  return reverseList;
}

export function getVehicle(year, model, vehicleList) {
  const filterByModel = vehicleList.filter(vehicle => vehicle.Model === model);
  const vehicle = filterByModel.find(
    selectVehicle => selectVehicle.Year === year,
  );
  return vehicle;
}
