import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function PledgeSystem() {
  const [joined, setJoined] = useState(false);
  return (
    <Box textAlign="center">
      <Typography variant="h6" gutterBottom>
        Community Pledge System
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Join eco-pledges, earn badges, and see the leaderboard!
      </Typography>
      <Button
        variant={joined ? 'outlined' : 'contained'}
        color="primary"
        onClick={() => setJoined(j => !j)}
      >
        {joined ? 'Leave Pledge' : 'Join Pledge'}
      </Button>
    </Box>
  );
}