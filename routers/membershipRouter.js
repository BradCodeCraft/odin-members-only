import { Router } from "express";
import {
  membershipGet,
  membershipPost,
} from "../controllers/membershipController.js";

const membershipRouter = Router();

membershipRouter.route("/").get(membershipGet).post(membershipPost);

export default membershipRouter;
