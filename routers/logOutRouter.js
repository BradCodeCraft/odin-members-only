import { Router } from "express";
import { logOutGet } from "../controllers/logOutController.js";

const logOutRouter = Router();

logOutRouter.route("/").get(logOutGet);

export default logOutRouter;
