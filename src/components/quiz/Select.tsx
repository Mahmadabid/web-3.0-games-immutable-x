import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectTypes } from '//types/type';

export default function SelectFrom({ Label, Options, value, onChange }: SelectTypes) {

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} required size='medium'>
      <InputLabel id={Label}>{Label.toUpperCase()}</InputLabel>
      <Select
        labelId={Label}
        id={Label}
        value={value}
        label={Label}
        onChange={onChange}
      >
        {Object.entries(Options).map(([key, displayValue]) => {
          return <MenuItem key={key} value={key}>{displayValue}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}