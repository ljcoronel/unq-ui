class TagController {
    constructor(service, tokenController) {
        this.service = service;
        this.tokenController = tokenController;
    }

    tags = async (req, res) => {
        const tags = this.service.tags;
        res.status(200).json(tags);
    }

    getGamesByTagId = async (req, res) => {
        try {
            const games = await this.service.getGamesByTag(req.params.tagId, req.query.page);
            res.status(200).json(games);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default TagController;