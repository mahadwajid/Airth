import React from 'react';
import AQIDisplay from './AQIDisplay';
import Suggestions from './Suggestions';
import EcoPoints from './EcoPoints';
import PledgeSystem from './PledgeSystem';

const DashboardHome = () => (
  <>
    <div className="dashboard-row">
      <AQIDisplay />
      <Suggestions />
    </div>
    <div className="dashboard-row">
      <EcoPoints />
      <PledgeSystem />
    </div>
  </>
);

export default DashboardHome;