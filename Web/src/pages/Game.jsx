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
            .then((response) => setGame(response))
            .catch((error) => setError(error.response.data.message))
            .finally(() => setLoading(false))
    },[gameId])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <>
            <div className="container">
                <div className="card">
                    <img src={game.mainImage} className="card-img-top" style={{ width: '1280px', height: '459px', objectFit: 'cover', objectPosition: 'top'}} alt={game.name}/>
                    <div className="position-relative">
                        <div className="position-absolute bottom-0 start-50 translate-middle-x">
                            <h1 className="text-white"> {game.name} </h1>
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-100 text-start">
                    <div><span className="fw-bold"> Developer: </span> <span className={"text-decoration-underline"}> {game.developer.name} </span></div>
                    <div><span className="fw-bold"> Website: </span> <span style={{textDecoration: 'underline'}}> {game.website} </span></div>
                    <div><span className="fw-bold"> Release Date: </span> {game.releaseDate.split('T')[0]} </div>
                    <div><span className="fw-bold"> Tags: </span>
                        {game.tags.length > 5 ? (
                            <>
                                {game.tags.slice(0, 5).map((tag) => (
                                    <a className="text-dark me-2" onClick={() => navigate(`/tags/${tag.id}`)}> {tag.name} </a>
                                ))} <a className="text-dark me-2" data-bs-toggle="modal" data-bs-target="#tagsModal"> more... </a>
                                <div className="modal fade" id="tagsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="tagsModalLabel">All tags</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {game.tags.map((tag) => (
                                                    <a className="text-dark me-2" onClick={() => navigate(`/tags/${tag.id}`)}> {tag.name} </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            game.tags.map((tag) => (
                                <a className="text-dark me-2" onClick={() => navigate(`/tags/${tag.id}`)}> {tag.name} </a>
                                ))
                            )}
                    </div>
                </div>
                {/* Un boton de comprar el juego */}
                <div className="mt-4">
                    <img src={game.multimedia[0].url} style={{width: '1280px', height: '548px', objectFit: 'cover'}} alt={game.name}/>
                </div>
                <div className="mt-4">
                    <div className="d-flex justify-content-around">
                        <img src={game.multimedia[0].url} style={{width: '200px', height: '129.36px', objectFit: 'cover'}} alt={game.name}/>
                        <img src={game.multimedia[1].url} style={{width: '200px', height: '129.36px', objectFit: 'cover'}} alt={game.name}/>
                        <img src={game.multimedia[2].url} style={{width: '200px', height: '129.36px', objectFit: 'cover'}} alt={game.name}/>
                        <img src={game.multimedia[3].url} style={{width: '200px', height: '129.36px', objectFit: 'cover'}} alt={game.name}/>
                        <img src={game.multimedia[4].url} style={{width: '200px', height: '129.36px', objectFit: 'cover'}} alt={game.name}/>
                        <img src={game.multimedia[5].url} style={{width: '200px', height: '129.36px', objectFit: 'cover'}} alt={game.name}/>
                    </div>
                </div>
                <div className="mt-4 w-100 text-start">
                    <h5 className="fw-bold">ABOUT THIS GAME</h5>
                    <p> {game.description} </p>
                </div>
                <div className="mt-4 w-100 text-start">
                    <h5 className="fw-bold">REQUIREMENTS</h5>
                    <div>OS: {game.requirement.os.join(', ')}</div>
                    <div>Processor {game.requirement.processor.join(', ')}</div>
                    <div>Memory: {game.requirement.memory}gb</div>
                    <div>Graphics {game.requirement.graphics.join(', ')}</div>
                </div>
                <div className="mt-4 w-100 text-start">
                    <h5 className="fw-bold">RELATED GAMES</h5>
                </div>
                <div id="relatedGamesCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {game.relatedGames.map((game, index) => (
                            <div className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                                <img src={game.mainImage} className="d-block w-100" style={{width: '300px', height: '369.23px', objectFit: 'cover'}} alt={game.name}/>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#relatedGamesCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#relatedGamesCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Game;