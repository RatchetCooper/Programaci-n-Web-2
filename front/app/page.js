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
/*var a;

var mysql = require("mysql");
var conexion = mysql.createConnection({

    host:'localhost',
    database:'prueba',
    user:'root',
    password:'password'
});
conexion.connect(function(err){
if(err)
{
    console.log('Error de conexion: ' + err.stack);
    return;
}
console.log('se conecto al id?' + conexion.threadId);
});
conexion.query('Select * from usuario', function (error, resultado, field){
    if(error)
    throw error;
resultado.forEach(resultado => {
console.log(resultado);
a = resultado;
});
});*/

export default function Home() {
  return (
      <div>
        <ThemeProvider theme={ theme }>
          <Characters></Characters>
        </ThemeProvider>
        resultado
      </div>
  );
}
