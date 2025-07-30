const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');

// Load AQI data from CSV (simulated)
function getSimulatedAQIData() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, '../data/aqi_sample.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

// Fetch AQI data from OpenAQ API (live)
async function getLiveAQIData(city = 'Delhi') {
  try {
    const response = await axios.get('https://api.openaq.org/v2/latest', {
      params: {
        city,
        parameter: 'pm25',
        limit: 1
      }
    });
    const results = response.data.results;
    if (results.length > 0) {
      const measurement = results[0].measurements.find(m => m.parameter === 'pm25');
      return [{
        city: results[0].city,
        aqi: measurement ? measurement.value : 'N/A',
        timestamp: measurement ? measurement.lastUpdated : 'N/A'
      }];
    } else {
      return [{ city, aqi: 'N/A', timestamp: 'N/A' }];
    }
  } catch (error) {
    return [{ city, aqi: 'N/A', timestamp: 'N/A', error: error.message }];
  }
}

module.exports = {
  getSimulatedAQIData,
  getLiveAQIData
};