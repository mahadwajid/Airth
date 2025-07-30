import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

function getAQIColor(aqi) {
  if (aqi <= 50) return 'success';
  if (aqi <= 100) return 'warning';
  if (aqi <= 150) return 'orange';
  if (aqi <= 200) return 'error';
  return 'secondary';
}

function getAQILabel(aqi) {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Unhealthy';
  return 'Very Unhealthy';
}

export default function AQIDisplay({ region, aqi }) {
  return (
    <Box textAlign="center">
      <Typography variant="h6">{region} AQI</Typography>
      <Typography variant="h2" sx={{ my: 1 }}>{aqi}</Typography>
      <Tooltip title={getAQILabel(aqi)}>
        <Chip label={getAQILabel(aqi)} color={getAQIColor(aqi)} size="medium" />
      </Tooltip>
    </Box>
  );
}