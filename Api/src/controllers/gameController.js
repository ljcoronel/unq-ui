import * as yup from "yup";
import {DraftReview} from "@unq-ui/gog-model-js/src/model/Drafts.js";

const pageOfGamesSchema =  yup.object().shape(
{
    page: yup.number().integer().min(1).default(1)
});

const gameBodySchema = object({
    isRecommended: boolean().required(),
    text: string().required(),
}).noUnknown(true).strict();


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
            res.json(this.service.getRecommendedGames());
        }catch(error){
            res.status(400).json({
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
