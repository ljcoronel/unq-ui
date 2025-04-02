import * as yup from "yup";

const pageOfGamesSchema =  yup.object().shape(
{
    page: yup.number().integer().min(1).default(1)
});


class GameController{
    constructor(service, tokenController){
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

}


export default GameController;


