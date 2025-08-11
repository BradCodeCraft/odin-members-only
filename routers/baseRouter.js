import { Router } from "express";

const baseRouter = Router();

baseRouter.route("/").get((req, res) => res.render("index"));

export default baseRouter;
