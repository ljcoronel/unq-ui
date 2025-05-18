import { useParams } from 'react-router-dom';

function TagsPage() {
    const { id } = useParams(); // Obtiene el ID del tag desde la URL

    return (
        <div>
            <h1>Tag ID: {id}</h1>
            {/* Aquí puedes cargar contenido relacionado con el tag */}
        </div>
    );
}

export default TagsPage;