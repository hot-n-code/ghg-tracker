import faker from 'faker';
import { writeFileSync } from 'fs';

/**
 * Defines the max amount of elements per collection
 * @type {{vehiclesPerUser: number, dailyUserDataPerUser: number, users: number}}
 */
const maxValues = {
  users: 3,
  dailyUserDataPerUser: 100,
  vehiclesPerUser: 3,
};

/**
 * Creates (maxValues.users) number of fake people
 * @returns array with objects containing:
 *    { name, email, password, goal, image }
 */
const createPeople = () => {
  const possibleGoals = [
    'convert to renewable energy',
    'reduce CO2 production',
    'use alternative transportation more',
    'save more fuel',
  ];

  const people = [];
  for (let iter = 0; iter < maxValues.users; iter++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const goalNumber = faker.helpers.randomize(possibleGoals);
    people.push({
      name: faker.name.findName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password(),
      goal: possibleGoals[goalNumber],
      image: faker.internet.avatar(),
    });
  }
  return people;
};

/**
 * Creates 1 to (maxValues.vehiclesPerUser) number of fake vehicles per user
 * @param accounts, an array of accounts
 * @returns array with objects containing:
 *      { make, model, logo, price, year, MPG, fuelSpending, type, owner }
 */
const createUserVehicles = (accounts) => {
  const vehicles = JSON.parse(Assets.getText('default-data/defaultAllVehicles.json'));
  const makes = JSON.parse(Assets.getText('default-data/defaultMakes.json'));

  // based on estimated average vehicle prices in 1990, 2000, 2010, 2020, and 2021
  const getVehiclePrice = (year) => {
    if (year < 2000) {
      return faker.datatype.number({ min: 9000, max: 20000, precision: 10 });
    } if (year < 2010) {
      return faker.datatype.number({ min: 20000, max: 29000, precision: 10 });
    } if (year < 2020) {
      return faker.datatype.number({ min: 29000, max: 37000, precision: 10 });
    }
    return faker.datatype.number({ min: 37000, max: 41000, precision: 10 });
  };

  const userVehicles = [];
  accounts.forEach(function (account) {
    const numVehicle = faker.datatype.number({ min: 1, max: maxValues.vehiclesPerUser });
    for (let iter = 1; iter <= numVehicle; iter++) {
      const vehicle = faker.helpers.randomize(vehicles);
      userVehicles.push({
        make: vehicle.Make,
        model: vehicle.Model,
        logo: makes.find(({ make }) => make === vehicle.Make).logo,
        price: getVehiclePrice(vehicle.Year),
        year: vehicle.Year,
        MPG: vehicle.Mpg,

        // computed as: price per gallon / miles per gallon * miles per year
        // average price per gallon in Hawaii as of 04/10/2021: $3.729/gallon
        // annual miles per vehicle (FHWA) in Hawaii: 11,583
        fuelSpending: ((vehicle.Mpg < 0 ?
            0 : Math.floor(((3.729 / vehicle.Mpg) * 11583)))),

        type: ((vehicle.Mpg < 0) ? 'EV/Hybrid' : 'Gas'),
        owner: account.email,
      });
    }
  });

  return userVehicles;
};

/**
 * Creates 1 to (possibleDistances.length) number of fake vehicles per user
 * @param accounts, an array of accounts
 * @returns array with objects containing:
 *    { location, distanceMiles, owner }
 */
const createFixedDistances = (accounts) => {
  const possibleDistances = [{
    location: 'work',
    distanceMiles: faker.datatype.float({ min: 0.5, max: 40 }),
  }, {
    location: 'school',
    distanceMiles: faker.datatype.float({ min: 0.5, max: 30 }),
  }, {
    location: 'grocery',
    distanceMiles: faker.datatype.float({ min: 0.5, max: 10 }),
  }];

  const fixedDistances = [];
  accounts.forEach(function (account) {
    for (let iter = 0; iter < possibleDistances.length; iter++) {
      const fixedDistance = possibleDistances[iter];
      fixedDistances.push({
        location: fixedDistance.location,
        distanceMiles: fixedDistance.distanceMiles,
        owner: account.email,
      });
    }
  });

  return fixedDistances;
};

/**
 * Creates the JSON file that contains the fake data for the collections
 * @returns {string}
 */
const writeJSON = () => {
  const data = {};
  const people = createPeople();

  data.defaultAccounts = people.map(person => ({
    email: person.email,
    password: person.password,
  }));

  data.defaultUsers = people.map(person => ({
    name: person.name,
    goal: person.goal,
    email: person.email,
    image: person.image,
  }));

  data.defaultUserVehicles = createUserVehicles(data.defaultAccounts);
  data.defaultFixedDistances = createFixedDistances(data.defaultAccounts);

  writeFileSync('random-data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
  });
};

writeJSON();
