export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface VerifyInput {
  id: string;
  verificationCode: string;
}