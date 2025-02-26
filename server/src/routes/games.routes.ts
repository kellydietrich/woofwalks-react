import express, { Request, Response } from "express";
import { GameModel, Game } from "../models/game.model";
import requireUser from "../middleware/requireUser";

const gamesRouter = express.Router();


gamesRouter.get("/api/games", requireUser, async (_req: Request, res: Response) => {
    try {
        const allGames = await GameModel.find();
        return res.status(200).json(allGames);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

gamesRouter.get("/api/games/:id", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req?.params?.id;
        const game: Game | null = await GameModel.findById(id);
        if (!game) {
            return res.status(404).send(`Unable to find matching document with id: ${id}`);
        }
        return res.status(200).json(game);
    }
    catch(error) {
        return res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
  });

gamesRouter.post("/api/games", async (req: Request, res: Response): Promise<Response> => {
    try {
        const newGame: Game = await GameModel.create({ ...req.body });

        if (!newGame) {
            return res.status(404).send(`Unable to create a new game`);
        }
        
        return res.status(200).json(newGame);
    }
    catch(error) {
        console.error(error);
        return res.status(400).send(error.message);
    }
});

gamesRouter.put("/api/games/:id", async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const updatedGame: Game | null = await GameModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, useFindAndModify: false } // Ensure options.useFindAndModify is set to false
        );

        if (!updatedGame) {
            return res.status(404).send(`Unable to update. Game with id ${id} not found.`);
        }

        return res.status(200).json(updatedGame);
    } catch (error) {
        console.error(error.message);
        return res.status(400).send(error.message);
    }
});


gamesRouter.delete("/api/games/:id", async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const deletedGame: Game | null = await GameModel.findByIdAndRemove(id, { useFindAndModify: false });

        if (!deletedGame) {
            return res.status(404).send(`Unable to delete. Game with id ${id} not found.`);
        }

        return res.status(200).json(deletedGame);
    } catch (error) {
        console.error(error.message);
        return res.status(400).send(error.message);
    }
});


export default gamesRouter;