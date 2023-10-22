import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectTypes } from '//types/type';

export default function SelectFrom({Label, Options}: SelectTypes) {
  const [Value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 140 }}>
      <InputLabel id={Label}>{Label.toUpperCase()}</InputLabel>
      <Select
        labelId={Label}
        id={Label}
        value={Value}
        label={Label}
        onChange={handleChange}
      >
        {Object.entries(Options).map(([key, displayValue]) => {
            return <MenuItem key={key} value={key}>{displayValue}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}