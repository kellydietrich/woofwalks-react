import React, { useState, useEffect, useRef, useCallback } from "react";
import axios, { Axios, AxiosResponse } from "axios";
import Layout from "../components/Layout";
import GameCard from "../components/GameCard";
import AddEditGameForm from "../components/AddEditGame";

// functions
import gamesApi from "../api";
import { Game } from "../types/game";
import { User } from "../types/user";

interface UserProps {
  user: User
}
  const GamesPage: React.FC = () => {

    const [loggedInUser, setLoggedInUser] = useState<User | null >(null);

    useEffect(() => {
      async function getUser() {
        try {
          let loggedIn: User
          const res = await gamesApi.getCurrentUser(); // <== Here we use await keywords to get the result of the Promise
          // console.log(res.data.user);
          loggedIn = res?.data?.user;
          setLoggedInUser(loggedIn);

          // console.log(loggedInUser)
        } catch (err : any) {
          // here display a message to the user or something else
          console.error(err.message);
        }
      }
  
      getUser(); // <== here we call the function to get the data
    }, []); // dependencies array is empty, so the callback is called only once when the component is mounted

  console.log(loggedInUser)

      //     const getUser = async () => {
      //     await gamesApi.getCurrentUser()
      //     .then((response: any) => {
      //       setLoggedInUser(response.data);
      //       console.log(response.data);
      //       console.log(response.data.firstName);
      //     })
      //     .catch((e: Error) => {
      //       console.log(e);
      //     });
      // };
      // useEffect(() => {
      //   getUser();
      // }, []);

    const [games, setGames] = useState<Game[]>([]);
    const [showGameCards, toggleShowCards] = useState<boolean>(true); // State to control whether to display game cards

    const [showGameDialog, setShowGameDialog] = useState(false);
    const [gameToEdit, setGameToEdit] = useState<Game | null>(null);

  

    // useEffect(() => {
    //   // Fetch games when the component mounts - original
    //   gamesApi.getGames()
    //     .then((response) => setGames(response.data))
    //     .catch((error) => console.error(error));
    // }, []);
  

    const handleDeleteGame = (game: Game) => {
        const toDelete = game._id
        gamesApi.deleteGame(toDelete!)
        .then((response) => {
          const updatedGames = games.filter((game) => game._id !== toDelete);
          setGames(updatedGames);
        })
        .catch((error) => console.error(error));
    };
  
    // useEffect(() => {
    //   loadGames();
    // }, []);

    // const loadGames = () => {
    //     gamesApi.getGames()
    //       .then((response: any) => {
    //         setGames(response.data);
    //         console.log(response.data);
    //       })
    //       .catch((e: Error) => {
    //         console.log(e);
    //       });
    //   };
  
    return (
      <Layout>
        <div className="hero py-32 bg-gray-700">
          <div className="hero-content grid md:grid-cols-2 gap-8">
            <div className="order-2">
              <img src="#" className="" alt="Hero" />
            </div>
            <div>
              <h1 className="text-5xl font-bold leading-normal text-white">
                Welcome to The Game Database, {loggedInUser?.firstName}!
              </h1>


              <button className="btn btn-primary mt-4" onClick={()=>setShowGameDialog(true)}>
                Add New Game
              </button>
            </div>
            {showGameCards && (
        <div className="flex flex-wrap">
          {games.map((game, index) => (
            <GameCard 
            key={ index || ''} 
            game={game}
            onGameClicked={()=>{
              setGameToEdit(game);
            }}
            onDeleteGame={handleDeleteGame}
            />
          ))}
        </div>
          )}
            {showGameDialog &&
                <AddEditGameForm
                    onDismiss={() => setShowGameDialog(false)}
                    onGameSaved={(newGame) => {
                        setGames([...games, newGame]);
                        setShowGameDialog(false);
                    }}
                />
            }
            {gameToEdit &&
        <AddEditGameForm
          gameToEdit={gameToEdit}
          onDismiss={() => {
            setGameToEdit(null);
            setShowGameDialog(false);
          }}
          onGameSaved={(updatedGame) => {
              setGames(games.map(existingGame => existingGame._id === updatedGame._id ? updatedGame : existingGame));
              setGameToEdit(null);
              setShowGameDialog(false); 
          }}
      />
            }
          </div>
        </div>              

      </Layout>
    );
  };

  export default GamesPage;