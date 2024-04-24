"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Landing from "./pages/Landing";
import theme from "./Theme";
import { ThemeProvider } from '@mui/material/styles'; //Contexto
import Characters from "./components/Characters";
import SearchCampaigns from "./pages/SearchCampaigns";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserCampaigns from "./components/UserCampaigns";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
      <div> 
        <ThemeProvider theme={ theme }>
          <Navbar></Navbar>
        </ThemeProvider>
      </div>
  );
}
