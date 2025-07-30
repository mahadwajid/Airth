import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function RegionSelector({ regions, selected, onSelect }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="region-select-label">Select Region</InputLabel>
      <Select
        labelId="region-select-label"
        id="region-select"
        value={selected}
        label="Select Region"
        onChange={e => onSelect(e.target.value)}
      >
        {regions.map(region => (
          <MenuItem key={region} value={region}>{region}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}