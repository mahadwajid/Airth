import React from 'react';
import './EcoPoints.css';

const EcoPoints = () => (
  <div className="card ecopoints-card">
    <h2>EcoPoints</h2>
    <p>Points: 120</p>
    <p>Badges: 🌱 🌳 🚴</p>
    <h3>Leaderboard</h3>
    <ol>
      <li>Alice - 200</li>
      <li>Bob - 150</li>
      <li>You - 120</li>
    </ol>
  </div>
);

export default EcoPoints;