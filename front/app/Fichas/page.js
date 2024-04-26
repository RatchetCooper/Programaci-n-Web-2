import React from 'react';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';



function BasePage({ children }) {
  return (

    
    <div >
     
     <Grid container spacing={0}>
<Grid xs={2} >
<CssBaseline />
      <Container maxWidth>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
     
</Grid>
<Grid xs={2}>
<CssBaseline />
      <Container maxWidth>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>

</Grid>
<Grid xs={8}>
<CssBaseline />

<Stack spacing={2}>
      <Container maxWidth>
        <Box sx={{ bgcolor: '#cfe8fc', height: '30vh' }} />
      </Container>
      <Container maxWidth>
        <Box sx={{ bgcolor: 'red', height: '70vh' }} />
      </Container>
      </Stack>
</Grid>

</Grid>




    </div>
  );
}


export default BasePage;
