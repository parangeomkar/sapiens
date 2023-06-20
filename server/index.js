const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const JWT = require("jsonwebtoken");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.CONNECTION_STRING;

app.use(cors({
    origin: ["https://sapiensclient.netlify.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/api/user", (req, res, next) => {
    try {
        const { exp } = JWT.decode(req.headers.authorization.split(" ")[1]);
        if (Date.now() >= exp * 1000)
            throw Error("Token expired!");
    } catch (e) {
        res.status(401).send({ message: "Invalid token!" });
        return;
    }
    next();
});


app.use("/api/user", usersRouter);
app.use("/api/auth", authRouter);


app.use("*", (req, res) => {
    res.status(400).send("Bad request!");
})

mongoose.connect(connectionString)
    .then(() => {
        console.log("MongoDB connected!");
        app.listen(PORT, () => {
            console.log("App is listening on port - " + PORT);
        })
    })
    .catch((err) => {
        console.error(err);
    })