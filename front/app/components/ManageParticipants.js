

const ManageParticipants = ({ campaignId, participants }) => {
    const handleRemove = (participantId) => {
        // Lógica para eliminar un participante
        fetch(`/api/campaigns/${campaignId}/participants/${participantId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Participante eliminado:', data);
                // Actualiza la lista de participantes después de la eliminación
            })
            .catch(error => console.error('Error eliminando participante:', error));
    };

    return (
        <div>
            <ul>
                {participants.map(participant => (
                    <li key={participant.id}>
                        {participant.name}
                        <button onClick={() => handleRemove(participant.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageParticipants;
