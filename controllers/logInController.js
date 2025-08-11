import { body, validationResult } from "express-validator";
import { request, response } from "express";
import bcrypt from "bcryptjs";
import * as db from "../db/queries.js";

/**
 * @param {request} req
 * @param {response} res
 */
export function logInFormGet(req, res) {
  res.render("auth/logIn", { req: req });
}
