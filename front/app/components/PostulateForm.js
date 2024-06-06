

const PostulateForm = ({ campaignId }) => {
    const [characterId, setCharacterId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para postular el personaje
        fetch(`/api/campaigns/${campaignId}/postulate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ characterId }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Postulado exitosamente:', data);
            })
            .catch(error => console.error('Error postulando:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="character">Selecciona tu personaje:</label>
            <select id="character" value={characterId} onChange={(e) => setCharacterId(e.target.value)}>
                {/* Suponiendo que tienes una lista de personajes */}
                <option value="">Selecciona un personaje</option>
                <option value="1">Personaje 1</option>
                <option value="2">Personaje 2</option>
                {/* Agrega más opciones según tu lista de personajes */}
            </select>
            <button type="submit">Postular</button>
        </form>
    );
};

export default PostulateForm;
