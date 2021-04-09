import faker from 'faker';
import { writeFile, readFile } from 'fs';

const maxValues = {
  users: 20,
  dailyUserDataPerUser: 100,
  vehiclesPerUser: 3,
};

const possibleGoals = [
    'convert to renewable energy',
    'reduce CO2 production',
    'use alternative transportation more',
    'save more fuel',
];

const getRandomNumber = (max) => Math.floor(Math.random() * max);

const createPerson = () => {
  const person = [];
  for (let iter = 0; iter < maxValues.users; iter++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const goalNumber = getRandomNumber(possibleGoals.length);
    person.push({
      first: firstName,
      last: lastName,
      name: faker.name.findName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password(),
      goal: possibleGoals[goalNumber],
      image: faker.internet.avatar(),
    });
  }
  return person;
};

const getAccounts = createPerson().map(person => ({
  email: person.email,
  password: person.password,
}));

const getUsers = createPerson().map(person => ({
  name: person.name,
  goal: person.goal,
  email: person.email,
  image: person.image,
}));

const writeJSON = () => {
  const data = {};
  data.defaultAccounts = getAccounts;
  data.defaultUsers = getUsers;

  writeFile('default-data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
  });

  readFile('default-data.json', (err, read) => {
    if (err) throw err;
    console.log(JSON.parse(read));
  });

  return JSON.stringify(data, null, 2);
};

writeJSON();
