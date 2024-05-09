import React from 'react';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Colapsable from './Colapsable';


function BasePage({ children }) {
  return (

    
    <div >
     
     <Grid container spacing={0}>
<Grid xs={3} >
<CssBaseline />
      <Container maxWidth>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', borderRadius:'20px' }} />
      </Container>
     
</Grid>

<Grid xs={2}>
<CssBaseline />
      <Container maxWidth>        
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' , borderRadius:'20px' }} />
      </Container>

</Grid>
<Grid xs={7}>
<CssBaseline />

<Stack spacing={2}>
      <Container maxWidth>
        <Box  sx={{ bgcolor: '#cfe8fc', height: '30vh', borderRadius:'20px'  }} />
      </Container>
      <Container maxWidth>
        <Box sx={{ bgcolor: 'red', height: '70vh', borderRadius:'20px'  }} />
      </Container>
      </Stack>
</Grid>

</Grid>




    </div>
  );
}


export default BasePage;
