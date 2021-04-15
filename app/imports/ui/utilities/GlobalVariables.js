// Common conversion factor of 8,887 grams of CO2 emissions per gallon of gasoline consumed (Federal Register 2010)
export const gHGPerGallon = 19.6;

// The weighted average combined fuel economy for cars and light trucks in 2017 (FHWA 2019)
// Read more: https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
export const averageAutoMPG = 22.3;

// Kilometers to Miles Conversion Factor
export const kmToMiFactor = 0.621371;

// Miles to Kilometers Conversion Factor
export const miToKmFactor = 1.609344;

// An array of all the Alternative Transportation modes that are not EV/Hybrid vehicles
export const altTransportation = [
  {
    label: 'Biking',
    value: 'biking',
  }, {
    label: 'Carpool',
    value: 'carpool',
  }, {
    label: 'Public Transportation',
    value: 'publicTransportation',
  }, {
    label: 'Telework',
    value: 'telework',
  }, {
    label: 'Walking',
    value: 'walking',
  }, {
    label: 'EV/Hybrid',
    value: 'EVHybrid',
  }];

// An array of Alternative Transportation labels
export const altTransportationLabels = altTransportation.map(alt => alt.label);

// An array of Alternative Transportation labels without 'EV/Hybrid'
export const altSelectFieldOptions = altTransportationLabels.filter(label => label !== 'EV/Hybrid');

export const altNoEVWalking = altSelectFieldOptions.filter(label => label !== 'Walking');

export const altNoEVWalkingBiking = altNoEVWalking.filter(label => label !== 'Biking');
