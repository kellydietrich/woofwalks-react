import { DocumentType } from "@typegoose/typegoose"; // to handle creating / modifying documents in the database
import { NextFunction, Request, Response } from "express"; 
import { get } from "lodash";
import { User } from "../models/user.model.js";
import { CreateSessionInput } from "../schemas/auth.schema";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../services/auth.service";
import { findUserByEmail, findUserById } from "../services/user.service";
import { verifyJwt } from "../utils/jwt";
import { token } from "morgan";

export const tokenGenerator = async (user: DocumentType<User>) => {
  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken({ userId: String(user._id) });
  return { accessToken, refreshToken };
};

// Create a Session w/ jwt Access Tokens
export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }

  if (!user.verified) {
    const message = "Please verify your email";
    return res.send({ message });
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(message);
  }

  // sign a access token
  // const accessToken = signAccessToken(user);

  // sign a refresh token
  // const refreshToken = await signRefreshToken({ userId: String(user._id) });
  const {accessToken, refreshToken} = await tokenGenerator(user);
  
  
  console.log({accessToken, refreshToken});
  console.log(user);


  return res.send({
    accessToken,
    refreshToken,
  });

}

// Refresh Access Token
export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const refreshToken = req.headers["x-refresh"];

    if (typeof refreshToken !== "string") {
      return res.status(401).send("Invalid refresh token");
    }
  
    const decoded = verifyJwt<{ session: string }>(
      refreshToken,
      "refreshTokenPublicKey"
    );

  if (!decoded) {
    return res.status(401).send("Could not refresh access token");
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send("Could not refresh access token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send("Could not refresh access token");
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });

}
