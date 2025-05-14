import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import Api from "../services/Api.js";

const Game = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()
    const [loading, setLoading] = useState(true)
    const [game, setGame] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true);
        setError('');
        Api.getGame(gameId)
            .then((response) => setGame(response.data))
            .catch((error) => setError(error.response.data.message))
            .finally(() => setLoading(false))
    }, [gameId])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return ()
}

export default Game;