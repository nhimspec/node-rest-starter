const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const UserSchema = new mongoose.Schema(
    {
        fullname: String,
        username: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            index: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true
        },
        avatar: String,
        salt: String,
        password: String
    },
    { timestamps: true }
);

UserSchema.methods.validPassword = function (password) {
    return this.password === password;
};

UserSchema.methods.setPassword = function (password) {
    this.password = password;
};

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            exp: parseInt(exp.getTime() / 1000)
        },
        config.secret
    );
};

UserSchema.methods.toAuthJSON = function () {
    return {
        fullname: this.fullname,
        username: this.username,
        email: this.email,
        avatar: this.avatar,
        token: this.generateJWT()
    };
};

module.exports = mongoose.model("User", UserSchema);
