import { Router } from "express";
import {
  deleteMessageGet,
  messagesGet,
  newMessageGet,
  newMessagePost,
} from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.route("/").get(messagesGet);
messagesRouter.route("/new").get(newMessageGet).post(newMessagePost);
messagesRouter.route("/:messageId/delete").get(deleteMessageGet);

export default messagesRouter;
