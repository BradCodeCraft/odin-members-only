import { request, response } from "express";

/**
 * @param {request} req
 * @param {response} res
 * @param {() => void} next
 */
export async function logOutGet(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/messages");
  });
}
