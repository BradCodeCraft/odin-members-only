import bcrypt from "bcryptjs";
import express from "express";
import path from "node:path";
import passport from "passport";
import pool from "./db/pool.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { Strategy as LocalStrategy } from "passport-local";
import baseRouter from "./routers/baseRouter.js";
import messagesRouter from "./routers/messagesRouter.js";
import logInRouter from "./routers/logInRouter.js";
import signUpRouter from "./routers/signUpRouter.js";
import logOutRouter from "./routers/logOutRouter.js";
import membershipRouter from "./routers/membershipRouter.js";

const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use(
  session({
    store: new (connectPgSimple(session))({
      pool: pool,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  }),
);
app.use(passport.session());
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];
      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/", baseRouter);
app.use("/log-in", logInRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-out", logOutRouter);
app.use("/membership", membershipRouter);
app.use("/messages", messagesRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Express application started at http://localhost:${PORT}`);
});
