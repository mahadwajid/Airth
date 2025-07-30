import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function EcoPoints({ points }) {
  // Assume 200 points needed for next badge
  const progress = Math.min((points / 200) * 100, 100);
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Eco-Points: {points}
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
      <Typography variant="caption" color="text.secondary">
        {200 - points} points to next badge
      </Typography>
    </Box>
  );
}