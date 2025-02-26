import React, { ChangeEvent, FormEvent, useState } from "react";
import { Game } from "../types/game"

interface AddGameFormProps {
  newGame: Game;
  onNewGameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitNewGame: (e: FormEvent) => void;
}

const AddGameForm: React.FC<AddGameFormProps> = ({ newGame, onNewGameChange, onSubmitNewGame }) => {
  return (
    <form onSubmit={onSubmitNewGame} className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Add New Game</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={newGame.name}
          onChange={onNewGameChange}
          placeholder="Title"
          className="input input-primary"
        />
        <input
          type="number"
          name="price"
          value={newGame.price}
          onChange={onNewGameChange}
          placeholder="Price"
          className="input input-primary"
        />
        <input
          type="text"
          name="category"
          value={newGame.category}
          onChange={onNewGameChange}
          placeholder="Category"
          className="input input-primary"
        />
        <button
          onClick={onSubmitNewGame}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddGameForm;