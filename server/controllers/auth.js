const User = require("../models/user");
const JWT = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
    try {
        const { username: user, password: pass } = req.body;
        const result = await User.findOne({ user: user });

        if (result.user == user && result.pass == pass) {
            const token = JWT.sign({ username: result.user, theme: result.theme },
                process.env.JWT_SECTET, { expiresIn: "50s" });
            res.send({ token });
        }
        else
            res.status(401).send({ message: "Login failed!" });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authenticateUser
}