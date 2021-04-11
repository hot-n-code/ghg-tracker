import faker from 'faker';
import { writeFileSync } from 'fs';
import { getDateToday, getModeType } from '../../ui/utilities/DailyGHGData';
import { altNoEVWalking, altNoEVWalkingBiking, altSelectFieldOptions } from '../../ui/utilities/GlobalVariables';

/**
 * Defines the max amount of elements per collection
 * @type {{vehiclesPerUser: number, dailyUserDataPerUser: number, users: number}}
 */
const maxQuantity = {
  users: 1,
  dailyUserDataPerUser: 14,
  vehiclesPerUser: 3,
};

/**
 * Creates (maxQuantity.users) number of fake people
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

  const people = [{
    name: 'test',
    goal: 'convert to renewable energy',
    email: 'test@gmail.com',
    password: 'foo',
    image: 'http://pngimg.com/uploads/pluto_disney/pluto_disney_PNG45.png',
  }];

  for (let iter = 0; iter < maxQuantity.users; iter++) {
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
 * Creates 1 to (maxQuantity.vehiclesPerUser) number of fake vehicles per user
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
    const numVehicle = faker.datatype.number({ min: 1, max: maxQuantity.vehiclesPerUser });
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
const createSavedDistances = (accounts) => {
  const possibleDistances = [{
    location: 'work',
    distanceMiles: Number(faker.datatype.float({ min: 0.5, max: 40 })),
  }, {
    location: 'school',
    distanceMiles: Number(faker.datatype.float({ min: 0.5, max: 30 })),
  }, {
    location: 'grocery',
    distanceMiles: Number(faker.datatype.float({ min: 0.5, max: 10 })),
  }];

  const savedDistances = [];
  accounts.forEach(function (account) {
    for (let iter = 0; iter < possibleDistances.length; iter++) {
      const savedDistance = possibleDistances[iter];
      savedDistances.push({
        location: savedDistance.location,
        distanceMiles: savedDistance.distanceMiles,
        owner: account.email,
      });
    }
  });

  return savedDistances;
};

/**
 * Creates (maxQuantity.dailyUserData) number of fake daily user data per user
 * @param accounts
 * @param savedDistances
 * @param userVehicles
 * @returns array with objects containing:
 *    { inputDate, modeOfTransportation, modeType, milesTraveled, owner }
 */
const createDailyUserData = (accounts, savedDistances, userVehicles) => {
  const dailyUserData = [];

  accounts.forEach(function (account) {
    const today = getDateToday();
    const tempDate = new Date(today);
    tempDate.setHours(0, 0, 0, 0);

    // get the type of regular trip based on saved distances
    const regularTripName = faker.helpers.randomize(['work', 'school']);
    const regularTrip = savedDistances.find(({ location }) => location === regularTripName);

    // get periodic trip
    const periodicTrip = savedDistances.find(({ location }) => location === 'grocery');

    const getModeAndType = (distance) => {
      let reasonableAlt;
      if (distance < 1) {
        reasonableAlt = altSelectFieldOptions;
      } else if (distance <= 15) {
        reasonableAlt = altNoEVWalking;
      } else {
        reasonableAlt = altNoEVWalkingBiking;
      }

      // get user's vehicles, concatenate array with alt transportation
      const modesOfTransportation = userVehicles.map((vehicle) => `${vehicle.make} ${vehicle.model}`).concat(reasonableAlt);
      const mode = faker.helpers.randomize(modesOfTransportation);

      return ({
        name: mode,
        type: getModeType(mode, userVehicles),
      });
    };

    for (let iter = 0; iter < maxQuantity.dailyUserDataPerUser; iter++) {
      // compute day before date of last pushed daily user data
      const newDate = new Date(tempDate);
      newDate.setDate(tempDate.getDate() - 1);

      // on Sundays, periodic trip
      if (newDate.getDay() === 0) {
        const modeAndType = getModeAndType(periodicTrip.distanceMiles);
        dailyUserData.push({
          inputDate: newDate,
          modeOfTransportation: modeAndType.name,
          modeType: modeAndType.type,
          milesTraveled: periodicTrip.distanceMiles,
          owner: account.email,
        });
      // on Saturdays, either go on trip or stay at home
      } else if (newDate.getDay() === 6) {
        const goOnTrip = faker.datatype.boolean();
        const randomMiles = faker.datatype.float({ min: 0.5, max: 50 });
        const modeAndType = getModeAndType(randomMiles);
        if (goOnTrip) {
          dailyUserData.push({
            inputDate: newDate,
            modeOfTransportation: modeAndType.name,
            modeType: modeAndType.type,
            milesTraveled: randomMiles,
            owner: account.email,
          });
        }
      // on weekdays, go to regular trip
      } else {
        const modeAndType = getModeAndType(regularTrip.distanceMiles);
        dailyUserData.push({
          inputDate: newDate,
          modeOfTransportation: modeAndType.name,
          modeType: modeAndType.type,
          milesTraveled: regularTrip.distanceMiles,
          owner: account.email,
        });
      }
      tempDate.setDate(newDate.getDate());
    }
  });
  return dailyUserData;
};

/**
 * Creates the JSON file that contains the fake data for the collections
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
  data.defaultSavedDistances = createSavedDistances(data.defaultAccounts);
  data.defaultDailyUserData = createDailyUserData(
      data.defaultAccounts,
      data.defaultSavedDistances,
      data.defaultUserVehicles,
      );

  // add admin account to defaultAccounts
  data.defaultAccounts.push({
    email: 'admin@foo.com',
    password: 'changeme',
  });
  writeFileSync('random-data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
  });
};

writeJSON();
