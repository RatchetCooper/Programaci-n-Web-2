"use client"
import {Button, Box, Typography, Grid, Item } from "@mui/material";
import CharacterCard from "./CharacterCard";


export default function Characters(){

    return(
        <div>
             <Button variant="contained" sx={{mb: 4}}>Unirse</Button>
             <Typography variant="h4">Tus personajes</Typography>
                <Typography variant="body">Texto pequeño</Typography>
             <Box sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 5,
                flexDirection: "column"
            }}>
               <CharacterCard></CharacterCard>

            </Box>
            
        </div>
    );
}