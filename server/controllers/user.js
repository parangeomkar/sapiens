const User = require("../models/user");

const updateUserPreferences = async (req, res, next) => {
    try {
        const { theme } = req.body;
        const userPreferences = await User.findOneAndUpdate({ user: req.params.id }, { theme }, {
            "fields": { "user": 1, "theme": 1 },
            "new": true
        });
        res.send(userPreferences);
    } catch (err) {
        next(err)
    }
}

const getUserPreferences = async (req, res, next) => {
    try {
        const user = await User.findOne({ user: req.params.id }, { "user": 1, "theme": 1 });
        res.send(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    updateUserPreferences,
    getUserPreferences
}