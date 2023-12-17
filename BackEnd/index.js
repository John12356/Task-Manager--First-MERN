require("./passport");
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const authModel = require("./Models/Model");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const TodoRoutes = require("./Routes/TodoRoutes");
const NoteRoutes = require("./Routes/NoteRoutes");
const TaskRoutes = require("./Routes/TaskRoutes");

const PORT = 8080;

const app = express();
app.use([
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "PUT", "DELETE"],
  }),
  express.json(),
  express.urlencoded({ extended: true }),
]);

const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  collectionName: "session",
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json(" hello ");
});

app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newAuth = new authModel({
    userName: userName,
    email: email,
    password: hashedPassword,
  });

  try {
    const user = await authModel.findOne({ email: email });
    if (user) res.json("Already Registerd");
    else {
      const savedUser = await newAuth.save();
      res.send(savedUser);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//Google authentication using passport

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_DOMAIN,
    successRedirect: `${process.env.FRONTEND_DOMAIN}/Home`,
  })
);

//For Facebook Authentication

app.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: process.env.FRONTEND_DOMAIN,
    successRedirect: `${process.env.FRONTEND_DOMAIN}/Home`,
  })
);

//Local Login
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: process.env.FRONTEND_DOMAIN,
  }),
  (req, res) => {
    res.json({ success: "successfully logged in" });
  }
);

//logout
app.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) res.send(err);
    else res.json({ success: "logged out" });
  });
});

app.get("/getUser", (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  }
});

//Forgot and reset password
app.post("/resetPassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(id);
  const { newPassword } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, encode) => {
    if (err) return res.send({ Status: "Try again after few minutes" });
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      authModel
        .findByIdAndUpdate({ _id: id }, { password: hashedPassword })
        .then((u) => res.send({ Status: "success" }))
        .catch((err) => res.send({ Status: err }));
    }
  });
});

app.post("/forgotpass", async (req, res) => {
  const { email } = req.body;
  await authModel.findOne({ email: email }).then((user) => {
    if (!user) return res.send({ Status: "Enter a valid email" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jhonmoorthi85131@gmail.com",
        pass: "klxb xvje ygnr qvbo",
      },
    });

    var mailOptions = {
      from: "jhonmoorthi85131@gmail.com",
      to: email,
      subject: "Forgot password for task manager",
      text: `${process.env.FRONTEND_DOMAIN}/ResetPass/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "success" });
      }
    });
  });
});

const authenticator = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Login Required" });
  }
  next();
};
app.use("/todo", [authenticator, TodoRoutes]);
app.use("/note", [authenticator, NoteRoutes]);
app.use("/task", [authenticator, TaskRoutes]);

app.listen(PORT, () => {
  console.log(`Server Running On Port : ${PORT} `);
});

module.exports = app;
