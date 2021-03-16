const sumMiles = (array) => array.reduce((accumulator, data) => accumulator + data.milesTraveled, 0).toFixed(2);

export function getCumulativeGHG(collection) {
  const eImpact = {};

  const altTransportation = collection.filter(({ cO2Reduced }) => cO2Reduced > 0);

  eImpact.cO2Reduced = altTransportation.reduce((a, b) => a + b.cO2Reduced, 0).toFixed(2);
  eImpact.cO2Produced = (collection.reduce((a, b) => a + Math.abs(b.cO2Reduced), 0)
      - eImpact.cO2Reduced).toFixed(2);
  eImpact.VMTReduced = sumMiles(altTransportation);
  eImpact.fuelSaved = (((eImpact.VMTReduced / eImpact.cO2Reduced)
      * 19.6) * altTransportation.length).toFixed(2);
  if (eImpact.fuelSaved === 'NaN') {
    eImpact.fuelSaved = 0;
  }
  return eImpact;
}
