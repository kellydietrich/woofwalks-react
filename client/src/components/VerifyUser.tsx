  
import { Button, Modal, Form } from "react-daisyui";
import { useForm } from "react-hook-form";
import React, { useState, useRef, useCallback } from "react";
import { User, VerifyInput } from "../types/user";
import gamesApi from "../api"
import TextInputField from "../form/TextInputField";
  

interface VerifyUserProps {
    onDismiss: () => void,
    onSuccess: (nextState: string) => void,
}

const VerifyUser = ({ onDismiss, onSuccess }: VerifyUserProps) => {

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<VerifyInput>({

defaultValues: {
id: "",
verificationCode: "",
}
});

const onSubmit = async (input: VerifyInput) => {
    console.log('onSubmit called', input);
    try {
        const response = await gamesApi.verifyUser(input.id, input.verificationCode);
        console.log({verifyResponse: response.data})
        //if(response.data.redirect === '/games'){ 
            onSuccess(response?.data?.redirect);
        //}
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

return (
<Modal open={true}>
    <Modal.Body className="modal-box">
    <Form id="verifyUser" onSubmit={handleSubmit(onSubmit)}>

<TextInputField
name="id"
label="Enter User Id"
type="text"
placeholder="Enter Id"
register={register}
registerOptions={{ required: "Required" }}
error={errors.id}
/>

<TextInputField
name="verificationCode"
label="Enter Verification Code"
type="text"
placeholder="Enter Code"
register={register}
registerOptions={{ required: "Required" }}
error={errors.verificationCode}
/>

<Button
type="submit"
form="verifyUser"
className="btn btn-primary"
disabled={isSubmitting}
>

Verify

</Button>
<Button onClick={onDismiss} className="btn btn-secondary">
            Cancel
</Button>
</Form>
    </Modal.Body>
</Modal>


);
}

  

export default VerifyUser;