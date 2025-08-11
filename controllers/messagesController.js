import { body, validationResult } from "express-validator";
import { request, response } from "express";
import * as db from "../db/queries.js";

/**
 * @param {request} req
 * @param {response} res
 */
export async function messagesGet(req, res) {
  try {
    const messages = await db.getAllMessages();

    res.render("messages/messages", { messages: messages, user: req.user });
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {request} req
 * @param {response} res
 */
export function newMessageGet(req, res) {
  res.render("messages/newMessage", { user: req.user });
}

const validateNewMessage = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title must not be empty!")
    .custom(async (value) => {
      const messages = await db.getAllMessages();

      if (messages && messages.find((message) => message.title == value))
        throw new Error("Title must be unique!");
    }),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content must not be empty!"),
];
export const newMessagePost = [
  validateNewMessage,
  /**
   * @param {request} req
   * @param {response} res
   */
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.render("messages/newMessage", { errors: errors.array() });
        return;
      }

      const { title, content } = req.body;
      await db.createMessage(title, content, req.user.id, new Date());
      res.redirect("/messages");
    } catch (err) {
      console.error(err);
    }
  },
];

/**
 * @param {request} req
 * @param {response} res
 */
export async function deleteMessageGet(req, res) {
  try {
    const { messageId } = req.params;
    await db.deleteMessageById(messageId);
    res.redirect("/messages");
  } catch (err) {
    console.error(err);
  }
}
