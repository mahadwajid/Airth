import React, { useEffect, useState } from 'react';
import './AQIDisplay.css';

const CITIES = ['New York', 'London', 'Delhi', 'Beijing'];

const AQIDisplay = () => {
  const [aqiData, setAqiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('sim');
  const [city, setCity] = useState('Delhi');
  const [predictions, setPredictions] = useState([]);
  const [predictionsLoading, setPredictionsLoading] = useState(false);
  const [predictionsError, setPredictionsError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = 'http://localhost:5000/api/data/live?source=' + source;
    if (source === 'live') {
      url += `&city=${encodeURIComponent(city)}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setAqiData(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch AQI data');
        setLoading(false);
      });
  }, [source, city]);

  useEffect(() => {
    setPredictionsLoading(true);
    setPredictionsError(null);
    fetch('http://localhost:5001/predict')
      .then(res => res.json())
      .then(data => {
        setPredictions(data);
        setPredictionsLoading(false);
      })
      .catch(err => {
        setPredictionsError('Failed to fetch predictions');
        setPredictionsLoading(false);
      });
  }, []);

  return (
    <div className="card aqi-card">
      <h2>Air Quality Index (AQI)</h2>
      <div style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label>
          <input
            type="radio"
            name="source"
            value="sim"
            checked={source === 'sim'}
            onChange={() => setSource('sim')}
          />
          Simulated
        </label>
        <label>
          <input
            type="radio"
            name="source"
            value="live"
            checked={source === 'live'}
            onChange={() => setSource('live')}
          />
          Live (OpenAQ)
        </label>
        {source === 'live' && (
          <select
            className="region-selector"
            value={city}
            onChange={e => setCity(e.target.value)}
          >
            {CITIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
      </div>
      {loading && <div>Loading AQI...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && aqiData.map((row, idx) => (
        <div key={idx} style={{ marginBottom: '16px' }}>
          <div className="aqi-value">{row.city}: AQI {row.aqi}</div>
          <div style={{ fontSize: '0.9rem', color: '#888' }}>{row.timestamp}</div>
          {row.error && <div style={{ color: 'red', fontSize: '0.9rem' }}>Error: {row.error}</div>}
        </div>
      ))}
      
      <h3 style={{ marginTop: '24px', color: '#2ecc7a' }}>AI Predictions (Next 5 Hours)</h3>
      {predictionsLoading && <div>Loading predictions...</div>}
      {predictionsError && <div style={{ color: 'red' }}>{predictionsError}</div>}
      {!predictionsLoading && !predictionsError && predictions.map((pred, idx) => (
        <div key={idx} style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            {new Date(pred.timestamp).toLocaleTimeString()}: AQI {Math.round(pred.predicted_aqi)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AQIDisplay;