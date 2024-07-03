const dotenv = require('dotenv');

async function globalSetup(config) {
  dotenv.config({
    path: './environments/stg.env',
    override: true
  });
}
  
module.exports = globalSetup;