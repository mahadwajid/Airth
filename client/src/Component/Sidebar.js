import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-logo">GreenInsight AI</div>
    <nav className="sidebar-nav">
      <Link to="/">Dashboard</Link>
      <Link to="/aqi">AQI</Link>
      <Link to="/suggestions">Suggestions</Link>
      <Link to="/ecopoints">EcoPoints</Link>
      <Link to="/pledges">Pledges</Link>
    </nav>
  </aside>
);

export default Sidebar;