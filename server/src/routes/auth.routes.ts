import express from "express";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controllers/auth.controller"; // import relevant handlers 
import validateResource from "../middleware/validateResource"; // import middleware for validating inputs from login form
import { createSessionSchema } from "../schemas/auth.schema"; // import schema for creating a session 

const router = express.Router(); // import the express router

// requests for the router (GET, POST, PUT, DELETE)
router.post(
  "/api/sessions",
  validateResource(createSessionSchema),
  createSessionHandler
); // Create a Session on User Login

router.post("/api/sessions/refresh", refreshAccessTokenHandler); // handle maintaining user session on page refresh

export default router;
