const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/../../config.json`; //config source ni e patekata do config.json fajlot

// __dirname ni e momentalnata datoteka kade sto se naogja /Users/imenavasiotkompjuter/semos-education/web-services-g1/c05/pkg/config
// /../../ - ova e isto kako da napisete cd .., cd ..

let config = null;

if (config === null) {
  const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
  config = JSON.parse(file);
}

// za da mozeme da dojdeme do development, staging, live
const getSection = (section) => {
  // stringot "development"
  if (!config[section])
    throw `Configuration section ${section} does not exist!`;
  return config[section];
};

module.exports = {
  getSection,
};