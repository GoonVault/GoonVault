import React from 'react'
import { Container, Typography } from '@mui/material'

export function Welcome() {
  return (
    <Container className="flex items-center justify-center pt-16 pb-4">
      <Typography variant="h4" component="h1">
        GOGO GV!
      </Typography>
    </Container>
  );
}
