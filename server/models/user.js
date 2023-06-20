const { model, Schema } = require("mongoose");

const userModel = new Schema({
    user: String,
    pass: String,
    theme: String
})

module.exports = model("userModel", userModel, "users");