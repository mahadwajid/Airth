import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './AQIDisplay.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  // Prepare chart data
  const chartData = {
    labels: predictions.map((pred, idx) => `+${idx + 1}h`),
    datasets: [
      {
        label: 'Predicted AQI',
        data: predictions.map(pred => Math.round(pred.predicted_aqi)),
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AQI Prediction Trend (Next 5 Hours)'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'AQI Value'
        }
      }
    }
  };

  const getAQICategory = (aqi) => {
    if (aqi <= 50) return { category: 'Good', color: '#00e400', bg: '#e8f5e8' };
    if (aqi <= 100) return { category: 'Moderate', color: '#ffff00', bg: '#fefde7' };
    if (aqi <= 150) return { category: 'Unhealthy for Sensitive Groups', color: '#ff7e00', bg: '#fff4e6' };
    if (aqi <= 200) return { category: 'Unhealthy', color: '#ff0000', bg: '#ffe6e6' };
    if (aqi <= 300) return { category: 'Very Unhealthy', color: '#8f3f97', bg: '#f3e6f3' };
    return { category: 'Hazardous', color: '#7e0023', bg: '#f3e6e9' };
  };

  return (
    <div className="card aqi-card">
      <h2>🌬️ Air Quality Index (AQI)</h2>
      
      <div className="aqi-controls">
        <div className="source-selector">
          <label className="radio-label">
            <input
              type="radio"
              name="source"
              value="sim"
              checked={source === 'sim'}
              onChange={() => setSource('sim')}
            />
            <span>Simulated</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="source"
              value="live"
              checked={source === 'live'}
              onChange={() => setSource('live')}
            />
            <span>Live (OpenAQ)</span>
          </label>
        </div>
        
        {source === 'live' && (
          <select
            className="city-selector"
            value={city}
            onChange={e => setCity(e.target.value)}
          >
            {CITIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
      </div>

      {loading && <div className="loading">🔄 Loading AQI data...</div>}
      {error && <div className="error">❌ {error}</div>}
      
      {!loading && !error && aqiData.map((row, idx) => {
        const aqiCategory = getAQICategory(parseInt(row.aqi) || 0);
        return (
          <div key={idx} className="aqi-item">
            <div className="aqi-header">
              <h3>{row.city}</h3>
              <div 
                className="aqi-badge"
                style={{ 
                  backgroundColor: aqiCategory.bg,
                  color: aqiCategory.color,
                  borderColor: aqiCategory.color
                }}
              >
                AQI {row.aqi}
              </div>
            </div>
            <div className="aqi-category">{aqiCategory.category}</div>
            <div className="aqi-timestamp">{row.timestamp}</div>
            {row.error && <div className="aqi-error">Error: {row.error}</div>}
          </div>
        );
      })}
      
      <div className="predictions-section">
        <h3>🤖 AI Predictions (Next 5 Hours)</h3>
        {predictionsLoading && <div className="loading">🔄 Loading predictions...</div>}
        {predictionsError && <div className="error">❌ {predictionsError}</div>}
        
        {!predictionsLoading && !predictionsError && predictions.length > 0 && (
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
        
        {!predictionsLoading && !predictionsError && predictions.map((pred, idx) => {
          const aqiCategory = getAQICategory(Math.round(pred.predicted_aqi));
          return (
            <div key={idx} className="prediction-item">
              <div className="prediction-time">
                {new Date(pred.timestamp).toLocaleTimeString()}
              </div>
              <div 
                className="prediction-aqi"
                style={{ color: aqiCategory.color }}
              >
                AQI {Math.round(pred.predicted_aqi)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AQIDisplay;