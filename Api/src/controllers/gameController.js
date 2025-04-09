import { object, boolean, string, number, array } from "yup";
import {DraftReview} from "@unq-ui/gog-model-js/src/model/Drafts.js";
import { json } from "express";

const pageOfGamesSchema = object().shape(
{
    page: number().integer().min(1).default(1)
});

const gameBodySchema = object({
    isRecommended: boolean().required(),
    text: string().required(),
}).noUnknown(true).strict();

const recomendedGamesSchema = array().max(10);


class GameController {
    constructor(service, tokenController) {
        this.service = service;
        this.tokenController = tokenController;
    }

    
    games = async (req,res) => {
        try{
            const validate =  await pageOfGamesSchema.validate(req.query); 
            res.json(this.service.getGames(validate.page));
        }catch(error){
            res.status(400).json({
                error: error.message
            });
        }
    }

    recomendedGames = async (req, res) => {
        try{
            const recommended = await this.service.getRecommendedGames().map(({id,name,mainImage,tags,price})=>({
                id,
                name,
                mainImage,
                tags,
                price
            }));
            recomendedGamesSchema.validate(recommended);
            res.json(recommended);
        }catch(error){
            res.status(400).json({
                error: error.message
            });
        }
        
    }

    gameById = async (req, res ) => {
        try{
            const gameId = req.params.gameId;
            const game = await this.service.getGame(this.gameById);
            res.json(game);
        }catch(error){
            res.status(404).json({
                error: error.message
            });
        }
    }

    transformGame = (game) => {
        const {description, multimedia, requirement, relatedGames, developer, 
                                releaseDate,reviews,esrb,website, ...simpleGame} = game;
        
        return simpleGame;
    }
            

    addGameById = async (req, res) => {
        try{
            const {id} = req.user;
            const cart = await this.service.addGameToCart(id, req.params.gameId);
            const cartGames = cart.games;
            const cartUser = cart.user;
            const simpleGames = cartGames.map((game)=> this.transformGame(game));
            const {email, password, backgroundImage, games, friends, ...simpleUser} = cartUser;
            res.json({cart: {games: simpleGames, user: simpleUser}})
        }catch(error){
            res.status(404).json({
                error: error.message
            });
        }
    }

    removeGame = async (req, res) => {
        try {
            const { id } = req.user;
            const cart = await this.service.removeGameFromCart(id, req.params.gameId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }

    addReview = async (req, res) => {
        try {
            const { id } = req.user;
            const gameId = req.params.gameId;
            const draftReview = await gameBodySchema.validate(req.body);
            const draft = new DraftReview(gameId, draftReview.isRecommended, draftReview.text);
            const review = await this.service.addReview(id, draft);
            res.status(200).json(review);
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
}

export default GameController;
