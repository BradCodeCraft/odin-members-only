import { Router } from "express";
import { logInFormGet } from "../controllers/logInController.js";
import passport from "passport";

const logInRouter = Router();

logInRouter
  .route("/")
  .get(logInFormGet)
  .post(
    passport.authenticate("local", {
      successRedirect: "/messages",
      failureRedirect: "/log-in",
      failureMessage: "Invalid username or password",
    }),
  );

export default logInRouter;
