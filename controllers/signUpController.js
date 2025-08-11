import { body, validationResult } from "express-validator";
import { request, response } from "express";
import bcrypt from "bcryptjs";
import * as db from "../db/queries.js";

/**
 * @param {request} req
 * @param {response} res
 */
export function signUpFormGet(req, res) {
  res.render("auth/signUp");
}

const validateNewUser = [
  body("name").trim().isLength({ min: 1 }).withMessage("Name can't be empty!"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username can't be empty!")
    .custom(async (username) => {
      const users = await db.getAllUsers();

      if (users.find((user) => user.username === username.toLowerCase()))
        throw new Error("Username is taken!");
    }),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password can't be empty!"),
];
export const signUpFormPost = [
  validateNewUser,
  /**
   * @param {request} req
   * @param {response} res
   */
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.render("auth/signUp", { errors: errors.array() });
        return;
      }

      const { name, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT),
      );
      await db.createUser(name, username, hashedPassword);
      res.redirect("/log-in");
    } catch (err) {
      console.error(err);
    }
  },
];
