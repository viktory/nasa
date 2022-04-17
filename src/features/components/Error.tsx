import { Alert } from '@mui/material';
import * as React from 'react';
import { useAppSelector } from '../../app/hooks';

// todo better Error Handling - in JSX and in state
function Error () {
  const error = useAppSelector((state) => state.gallery.error);

  return (
    error ? <Alert severity="error">{error}</Alert> : null
  );
}

export default Error;
