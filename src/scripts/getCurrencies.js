const countryData = require("country-data");
/**
 * Get currencies
 * @param {String} country code
 */
module.exports = (countryCode) => {
  //   const p = countryData;
  return countryData.countries[countryCode].currencies;
};
