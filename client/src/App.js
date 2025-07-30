import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import DashboardHome from './Component/DashboardHome';
import AQIDisplay from './Component/AQIDisplay';
import Suggestions from './Component/Suggestions';
import EcoPoints from './Component/EcoPoints';
import PledgeSystem from './Component/PledgeSystem';

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="aqi" element={<AQIDisplay />} />
          <Route path="suggestions" element={<Suggestions />} />
          <Route path="ecopoints" element={<EcoPoints />} />
          <Route path="pledges" element={<PledgeSystem />} />
        </Route>
      </Routes>
    
  );
}

export default App;
