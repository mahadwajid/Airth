const express = require('express');
const router = express.Router();
const { getSimulatedAQIData, getLiveAQIData } = require('../Controller/aqiDataController');

// GET /api/data/live?source=sim|live&city=CityName
router.get('/live', async (req, res) => {
  const source = req.query.source || 'sim';
  const city = req.query.city || 'Delhi';
  try {
    if (source === 'live') {
      const data = await getLiveAQIData(city);
      // If live data is not available, fallback to simulated
      if (data[0].aqi === 'N/A') {
        const simData = await getSimulatedAQIData();
        return res.json({ source: 'sim', data: simData });
      }
      return res.json({ source: 'live', data });
    } else {
      const data = await getSimulatedAQIData();
      return res.json({ source: 'sim', data });
    }
  } catch (err) {
    // On error, fallback to simulated data
    const data = await getSimulatedAQIData();
    return res.json({ source: 'sim', data });
  }
});

module.exports = router;