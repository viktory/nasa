import styled from '@emotion/styled';
import {
  FormControl, OutlinedInput, InputAdornment, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState } from 'react';
import * as React from 'react';

const StyledSearchInput = styled.div`
  display: flex;
  justify-content: center;
  
  &&> * {
    margin: 8px;
  }
`;

interface SearchProps {
  onSubmit: (q: string) => void;
}

function Search ({ onSubmit }: SearchProps) {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => { onSubmit(value); };

  return (
    <StyledSearchInput>
      <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={value}
          placeholder="Search Images"
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
              )}
        />
      </FormControl>
      <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSubmit}>Search</Button>
    </StyledSearchInput>

  );
}

export default Search;
