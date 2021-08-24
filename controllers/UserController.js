const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { uploadErrors } = require("../utils/errors.utils");
//const ObjectID = require("mongoose").Types.ObjectId;
// const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);

//Auth
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        if(!existingUser) return res.status(404).json({message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalide Credentials"});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });

    } catch (err) {
      return res.status(400).send(err);
    }
  };


  module.exports.signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        if(existingUser) return res.status(400).json({message: "User already exists"});

        // if(!password === confirmPassword) return res.status(400).json({message: "Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({ username:username, email:email, password:hashedPassword });

        const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: "1h" });

        res.status(200).json({ result, token });

    } catch (err) {
      return res.status(400).send(err);
    }
  };