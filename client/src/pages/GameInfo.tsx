import React, { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";

import { createGame, updateGame, deleteGame, getGames, getGame }  from "../api"
import { Game } from "../types/game";

const GameInfo: React.FC = () => { // Define the Home functional component
    const [game, setGame] = useState<Game | null>(null);
    const { gameId } = useParams(); // Get gameId from URL parameters

    const loadGame = () => {
        getGame(gameId!)
          .then((response: any) => {
            setGame(response.data);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      };
  
    // Load the game when the component mounts
    useEffect(() => {
      loadGame();
    }, [gameId]);
  
    return (
      <Layout>
        {game ? (
          <div>
            <h2>Game Information</h2>
            <p>Name: {game.name}</p>
            <p>Price: {game.price}</p>
            <p>Category: {game.category}</p>
          </div>
        ) : (
          <p>Loading game information...</p>
        )}
      </Layout>
    );
  }
  
  export default GameInfo;
  