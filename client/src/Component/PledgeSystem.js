import React from 'react';
import './PledgeSystem.css';

const PledgeSystem = () => (
  <div className="card pledge-card">
    <h2>Community Pledge System</h2>
    <p>Join a pledge to reduce pollution and earn eco-points!</p>
    <button className="join-pledge-btn">Join Pledge</button>
    <div className="pledge-progress">
      <p>Community Progress: 65%</p>
      <div className="progress-bar">
        <div className="progress" style={{width: '65%'}}></div>
      </div>
    </div>
  </div>
);

export default PledgeSystem;