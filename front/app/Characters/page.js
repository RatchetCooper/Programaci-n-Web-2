"use client"
import {Button, Box, Typography, Grid, Item , Card, Theme} from "@mui/material";
import CharacterCard from "../components/CharacterCard";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider

export default function Characters(){
    const theme = useTheme();
    return(
        <div>
            
        
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