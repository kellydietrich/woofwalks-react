// GameCard.tsx
import React, { useState, useRef, useCallback } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Card, Button, Modal } from "react-daisyui"; // Import Card and Button from react-daisyui

import { Game }from "../types/game";

import AddEditGameDialog from "./AddEditGame";

interface GameCardProps {
  game: Game,
  onGameClicked: (game: Game) => void,
  onDeleteGame: (game: Game) => void,
}

const GameCard: React.FC<GameCardProps> = ({ game, onGameClicked, onDeleteGame }: GameCardProps) => {

  return (
    <>
    <Card onClick={() => onGameClicked(game)} className="bg-white w-56 mx-3" compact={true}>
      <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={game.name} />
      <Card.Body>
        <Card.Title tag="h2">{game.name}</Card.Title>
        <p>Price: ${game.price}</p>
        <p>Category: {game.category}</p>
        <p>Id: {game._id}</p>
        <Card.Actions className="justify-end">
          <Link to={`/games/${game._id}`}>
            <Button>Show Details</Button>
          </Link>
          
            <Button onClick={(e) => {
                            onDeleteGame(game);
                            e.stopPropagation();
                            }}>Delete</Button>
      
        </Card.Actions>
      </Card.Body>
    </Card>
    </>
  );
};

export default GameCard;
