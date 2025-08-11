import { Router } from "express";
import {
  signUpFormGet,
  signUpFormPost,
} from "../controllers/signUpController.js";

const signUpRouter = Router();

signUpRouter.route("/").get(signUpFormGet).post(signUpFormPost);

export default signUpRouter;
