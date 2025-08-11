import { request, response } from "express";
import { body, validationResult } from "express-validator";
import * as db from "../db/queries.js";

/**
 * @param {request} req
 * @param {response} res
 */
export function membershipGet(req, res) {
  res.render("auth/membership", { user: req.user });
}

const validatePasscode = [
  body("passcode")
    .trim()
    .isNumeric()
    .withMessage("Passcode must be numeric.")
    .isLength({ min: 4, max: 4 })
    .withMessage("Passcode must be 4 characters."),
];
export const membershipPost = [
  validatePasscode,
  /**
   * @param {request} req
   * @param {response} res
   */
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("auth/membership", { errors: errors.array() });
    }

    const { passcode } = req.body;
    if (passcode === process.env.PASSCODE)
      await db.updateUserMembershipById(req.user.id);
    res.redirect("/messages");
  },
];
