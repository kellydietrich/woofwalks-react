import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Layout from "../components/Layout";
import GameCard from "../components/GameCard";
import AddGameForm from "../components/AddGameForm";

import gamesApi from "../api"
import { Game } from "../types/game"
  
  const AddGame: React.FC = () => {

    const initialGameState = {
    id: '',
    name: '',
    price: 0,
    category: ''
    };

    const [newGame, setNewGame] = useState<Game>(initialGameState);
    const [submitted, setSubmitted] = useState<boolean>(false);

  
    const addNewGame = () => {
      try {
        var data = {
            id: '',
            name: newGame.name,
            price: newGame.price,
            category: newGame.category
          };
      
        gamesApi.createGame(data)
        .then((response: any) => {
            setNewGame({
            name: response.data.name,
            price: response.data.price,
            category: response.data.category
            });
            setSubmitted(true);
            console.log(response.data);
        })
      } catch (error) {
        console.error("Error adding a new game:", error);
      }
    };
  
    const handleNewGameChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewGame((prevNewGame) => ({
        ...prevNewGame,
        [name]: name === "price" ? parseFloat(value) : value,
      }));
    };
  
    const resetGameInputs = () => {
        setNewGame(initialGameState);
        setSubmitted(false);
      };
  
    return (
      <Layout>
        <form onSubmit={addNewGame} className="mt-8">
        {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={resetGameInputs}>
            Add
          </button>
        </div>
      ) : (
        <>
        <h2 className="text-xl font-semibold mb-4">Add New Game</h2>
        <div className="space-y-4">
            <input
            type="text"
            name="name"
            value={newGame.name}
            onChange={handleNewGameChange}
            placeholder="Title"
            className="input input-primary"
            />
            <input
            type="number"
            name="price"
            value={newGame.price}
            onChange={handleNewGameChange}
            placeholder="Price"
            className="input input-primary"
            />
            <input
            type="text"
            name="category"
            value={newGame.category}
            onChange={handleNewGameChange}
            placeholder="Category"
            className="input input-primary"
            />
            <button
            type="submit"
            className="btn btn-primary"
            >
            Submit
            </button>
        </div>
        </>
      )}

        </form>
      </Layout>
    );
  };

  export default AddGame;