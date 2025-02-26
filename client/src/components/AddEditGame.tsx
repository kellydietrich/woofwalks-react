  
import { Button, Modal, Form } from "react-daisyui";
import { useForm } from "react-hook-form";
import React, { useState, useRef, useCallback } from "react";
import { Game, GameInput } from "../types/game";
import gamesApi from "../api"
import TextInputField from "../form/TextInputField";
  

interface AddEditGameDialogProps {
gameToEdit?: Game,
onDismiss: () => void,
onGameSaved: (game: Game) => void,
}

const AddEditGameDialog = ({ gameToEdit, onDismiss, onGameSaved }: AddEditGameDialogProps) => {
const [games, setGames] = useState<Game[]>([]);

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GameInput>({

defaultValues: {
name: gameToEdit?.name || "",
price: gameToEdit?.price || 0,
category: gameToEdit?.category || "",
}
});

const onSubmit = async (input: GameInput) => {
    console.log('onSubmit called', input);
    try {
      let gameResponse: Game;

      if (gameToEdit) {
        const response = await gamesApi.updateGame(gameToEdit._id!, input);
        console.log(response.data)
        gameResponse = response.data;
      } else {
        const response = await gamesApi.createGame(input);
        console.log(response.data)
        gameResponse = response.data;
      }

      onGameSaved(gameResponse);
      onDismiss();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

return (
<Modal open={true}>
    <Modal.Body className="modal-box">
    <Form id="addEditGameForm" onSubmit={handleSubmit(onSubmit)}>

<TextInputField
name="name"
label="Game Title"
type="text"
placeholder="Game Title"
register={register}
registerOptions={{ required: "Required" }}
error={errors.name}
/>

<TextInputField
name="price"
label="Game Price"
type="float"
placeholder="Game Price"
register={register}
registerOptions={{ required: "Required" }}
error={errors.price}
/>

<TextInputField
name="category"
label="Game Category"
type="text"
placeholder="Game Category"
register={register}
registerOptions={{ required: "Required" }}
error={errors.category}
/>

<Button
type="submit"
form="addEditGameForm"
className="btn btn-primary"
disabled={isSubmitting}
>

Save

</Button>
<Button onClick={onDismiss} className="btn btn-secondary">
            Cancel
</Button>
</Form>
    </Modal.Body>
</Modal>


);
}

  

export default AddEditGameDialog;