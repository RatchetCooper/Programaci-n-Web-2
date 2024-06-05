import React, { useState, useEffect } from 'react';
import PostulateForm from '../components/PostulateForm';
import ManageParticipants from '../components/ManageParticipants';

const CampaignDetails = ({ id }) => {
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        // Fetch campaign details
        if (id) {
            fetch(`/api/campaigns/${id}`)
                .then(response => response.json())
                .then(data => setCampaign(data))
                .catch(error => console.error('Error fetching campaign:', error));
        }
    }, [id]);

    if (!campaign) return <div>Loading...</div>;

    return (
        <div>
            <h1>{campaign.name}</h1>
            <p>{campaign.description}</p>

            <h2>Postularse a la Campaña</h2>
            <PostulateForm campaignId={id} />

            <h2>Participantes</h2>
            <ManageParticipants campaignId={id} participants={campaign.participants} />
        </div>
    );
};

export default CampaignDetails;
