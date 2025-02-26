  
import { Button, Modal, Form, Card } from "react-daisyui"; // import form, card, modal and button styles
import { useForm } from "react-hook-form"; // use custom hooks to manage the form
import React, { useState, useRef, useCallback } from "react"; // 
import { User, UserInput } from "../types/user"; // 
import gamesApi from "../api"; // 
import TextInputField from "../form/TextInputField"; //  
  

interface RegisterUserFormProps {
  onRegistrationSuccess: () => void; // Callback function to be called on successful registration
}

const RegisterUserForm = ({ onRegistrationSuccess }: RegisterUserFormProps) => {

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserInput>({

defaultValues: {
firstName: "",
lastName: "",
email: "",
password: "",
passwordConfirmation: "",
}
});

const onSubmit = async (input: UserInput) => {
    console.log('onSubmit called', input);
    try {
    //   let userResponse: User;
        const response = await gamesApi.createUser(input);
        console.log(response.data);
        // Call the callback function passed from the parent component
      onRegistrationSuccess();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

return (
<Card>
    <Card.Body className="modal-box">
    <Form id="registerUserForm" onSubmit={handleSubmit(onSubmit)}>

<TextInputField
name="firstName"
label="First Name"
type="text"
placeholder="First Name"
register={register}
registerOptions={{ required: "Required" }}
error={errors.firstName}
/>

<TextInputField
name="lastName"
label="Last Name"
type="text"
placeholder="Last Name"
register={register}
registerOptions={{ required: "Required" }}
error={errors.lastName}
/>

<TextInputField
name="email"
label="Email"
type="text"
placeholder="i.e. joe@walker.com"
register={register}
registerOptions={{ required: "Required" }}
error={errors.email}
/>

<TextInputField
name="password"
label="Enter Password"
type="text"
placeholder="Password"
register={register}
registerOptions={{ required: "Required" }}
error={errors.password}
/>

<TextInputField
name="passwordConfirmation"
label="Confirm Password"
type="text"
placeholder="Confirm Password"
register={register}
registerOptions={{ required: "Required" }}
error={errors.passwordConfirmation}
/>

<Button
type="submit"
form="registerUserForm"
className="btn btn-primary"
disabled={isSubmitting}
>

Register

</Button>
</Form>
    </Card.Body>
</Card>


);
}

  

export default RegisterUserForm;