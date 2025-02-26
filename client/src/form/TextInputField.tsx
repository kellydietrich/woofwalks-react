
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Input, Card, Form } from "react-daisyui"

interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const TextInputField = ({ name, label, register, registerOptions, error, ...props }: TextInputFieldProps) => {
    return (
        <>
        <div 
            className="form-control w-full max-w-xs"
            id={name + "-input"}
        >
        <label className="label">
        <span className="label-text">{label}</span>
        </label>
        <Input {...props} 
        {...register(name, registerOptions)}
        />
        </div>
        </>
    );
}

export default TextInputField;