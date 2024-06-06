"use client"
import React, { useState, useEffect } from 'react';
import PostulateForm from '../components/PostulateForm';
import ManageParticipants from '../components/ManageParticipants';


const url_string = window.location.href;
const url = new URL(url_string);
const Id = url.searchParams.get('id');

console.log('p:',Id);


const CampaignDetails = () => {
    const [campaign, setCampaign] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!loading) {
            // traer la info de la campaña seleccionada
            infocampaña();
            
        }
    });
    const infocampaña = async (e) => {
        console.log('perra id:',Id);
        try {
            const response = await fetch('http://localhost:8000/infoCamp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Id:Id })
            });
            const data = await response.json();
            
            if (response.ok) {
              for(const key in data){
           
                const base64Image = `data:${data[key].Imagen};base64,${Buffer.from(data[key].Imagen).toString('base64')}`;
              
                data[key].Imagen = base64Image;
    
                var fecha = new Date(data[key].Fecha);
                fecha = fecha.getFullYear()+'-' + (fecha.getMonth()+1)+'-' + fecha.getDate();
                data[key].Fecha = fecha;
            }

          console.log(data);
          setCampaign(data);
          setLoading(true);
         
             
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('error al buscar:', error.message);
        }
      };
  
   

    if (!campaign) return <div>Loading...</div>;

    return (
        <div>
            <h1>{campaign.name}</h1>
            <p>{campaign.description}</p>

            <h2>Postularse a la Campaña</h2>
           
        </div>
    );
};

export default CampaignDetails;
