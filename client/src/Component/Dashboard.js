import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import RegionSelector from './RegionSelector';
import AQIDisplay from './AQIDisplay';
import EcoPoints from './EcoPoints';
import PledgeSystem from './PledgeSystem';

const mockRegions = ['New York', 'London', 'Delhi', 'Beijing'];
const mockAQIData = {
  'New York': 42,
  'London': 55,
  'Delhi': 180,
  'Beijing': 130,
};

export default function Dashboard() {
  const [region, setRegion] = useState(mockRegions[0]);
  const aqi = mockAQIData[region];
  const ecoPoints = 120;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GreenInsight AI
          </Typography>
          <Avatar alt="User" src="" />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <RegionSelector regions={mockRegions} selected={region} onSelect={setRegion} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <AQIDisplay region={region} aqi={aqi} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <EcoPoints points={ecoPoints} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <PledgeSystem />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}