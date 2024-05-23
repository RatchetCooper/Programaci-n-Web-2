"use client"
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'
import styles from "../globals.css"
import UserCampaignsCard from "../components/UserCampaignsCard";


export default function UserCampaigns() {
    const router = useRouter()
    const userCampaignsData = [{ "username": "Erika", "campaignName": "Test 1" }, { "username": "Juan", "campaignName": "Test 2" }]
    const cambiarPagina = () => {
        //base de datos
        router.push('/CreateCampaigns', { scroll: false })

    };
    return (
        <div>

            {/*  <Box sx={{ 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 5,
                    flexDirection: "column"
                    }}>
                
            </Box> */}

            |           <Box sx={{
                display: "flex",
                justifyContent: "center",

            }}>
                <Box sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        mb: 4
                    }}>
                        <Button variant="contained" onClick={cambiarPagina} className="global-button">
                            Crear campaña
                        </Button>
                    </Box>
                    <Typography className="global-text-header">Tus campañas</Typography>
                </Box>
            </Box>
            {
                userCampaignsData.map((usercampaign, index) => (
                    <UserCampaignsCard userCampaignData={usercampaign}></UserCampaignsCard>
                ))
            }
        </div>
    );
}