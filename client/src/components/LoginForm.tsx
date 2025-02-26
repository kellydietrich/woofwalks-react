  
import { Button, Form, Card } from "react-daisyui";
import { useForm } from "react-hook-form";
import React, { useState, useRef, useCallback } from "react";
import gamesApi from "../api"
import { CreateSessionInput } from "../types/session"
import TextInputField from "../form/TextInputField";
import { User } from "../types/user";

interface LoginFormProps {
    onUserNotVerified: () => void,
    onSuccess: () => void,
}

const LoginForm = ({ onUserNotVerified, onSuccess }: LoginFormProps) => {

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateSessionInput>({

defaultValues: {
email: "",
password: "",
}
});

const onSubmit = async ( input: CreateSessionInput) => {
    console.log('onSubmit called', input);
    try {
    //   let userResponse: User;
        const response = await gamesApi.loginUser(input);
        const { message, accessToken, refreshToken } = response.data;
        if( message === 'Please verify your email' ){
            onUserNotVerified();
        }
        else {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            onSuccess();
        }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

return (
<Card>
    <Card.Body className="modal-box">
    <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>

<TextInputField
name="email"
label="Email"
type="text"
placeholder="Enter email address"
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

<Button
type="submit"
form="loginForm"
className="btn btn-primary"
disabled={isSubmitting}
>

Log In

</Button>
</Form>
    </Card.Body>
</Card>


);
}

  

export default LoginForm;