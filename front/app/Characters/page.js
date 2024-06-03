
"use client";

import { useEffect, useState } from 'react';
import { Button, Box } from "@mui/material";
import CharacterCard from "../components/CharacterCard";
import { useTheme } from '@mui/material/styles';
import CookieManager from "../Cookies/Cookies";

export default function Characters() {
    const theme = useTheme();
    const [userId, setUserId] = useState(null);
    const [fichas, setFichas] = useState([]);

    useEffect(() => {
        // Get the user ID from cookies
        const id = CookieManager.getCookie('id');
        setUserId(id);

        // Fetch the user's fichas
        const fetchFichas = async () => {
            try {
                const response = await fetch('http://localhost:8000/getUserFichas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch Fichas');
                }

                const data = await response.json();
                setFichas(data.fichas);
            } catch (error) {
                console.error('Error fetching Fichas:', error);
            }
        };

        fetchFichas();
    }, [userId]);
    const createFicha = async () => {
        if (!userId) {
            console.error("User ID not found in cookies");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/createFicha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            if (!response.ok) {
                throw new Error('Failed to create Ficha');
            }

            const data = await response.json();
            CookieManager.setCookie("FichaId",data.fichaId,365);
            CookieManager.setCookie("IsOwner",true,365);
            console.log('Ficha created successfully:', data);
            window.location.href = '/Fichas'
            // Handle the response data as needed
        } catch (error) {
            console.error('Error creating Ficha:', error);
        }
    };

    return (
        <div>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 5,
                flexDirection: "column"
            }}>
                <Button variant="contained" onClick={createFicha} sx={{ mb: 4 }}>
                    Crear personaje
                </Button>

                {fichas.map((ficha, index) => (
                    <CharacterCard key={index} ficha={ficha} />
                ))}
            </Box>
        </div>
    );
}
