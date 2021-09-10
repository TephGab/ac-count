const acModel = require("../models/AcModel");
const oldAcModel = require("../models/OldAcModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
// const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);

//Auth
let userEmail;

module.exports.getAc = (req, res) => {
  acModel.find({email: userEmail}, (err, docs) => {
    if (!err)
     {
       res.send(docs);
      }
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

  module.exports.addAc = async (req, res) => {
    if(req.body.etat === true){
      const formatedAcCodes = "("+req.body.data.accessCode+"-done) ";
      const newAc = new acModel({
        email: req.body.email
        // isActive: true
      });
      try {
        const ac = await newAc.save();
        return res.status(201).json(ac);
      } catch (err) {
        return res.status(400).send(err);
      }
    };
    if(req.body.etat === false && req.body.isDel != "reset"){
      const formatedAcCodes = "("+req.body.data.accessCode+"-undone) ";
      const newAc = new acModel({
        email: req.body.email,
        undoneAccessCode: formatedAcCodes,
        isActive: true
      });
      try {
        const ac = await newAc.save();
        return res.status(201).json(ac);
      } catch (err) {
        return res.status(400).send(err);
      }
    };
    if(req.body.etat === false && req.body.isDel == "reset"){
      console.log('controller reset')
      const newAc = new oldAcModel({
        _id: req.body.data[0]._id,
        email:req.body.data[0].email,
        doneAccessCode: req.body.data[0].doneAccessCode,
        undoneAccessCode: req.body.data[0].undoneAccessCode
      });
      try {
        const ac = await newAc.save();
        return res.status(201).json(ac);
      } catch (err) {
        return res.status(400).send(err);
      }
      console.log('reset success')
      // const formatedAcCodes = "("+req.body.data.accessCode+"-undone) ";
      // const newAc = new acModel({
      //   email: req.body.email,
      //   undoneAccessCode: formatedAcCodes,
      //   isActive: true
      // });
      // try {
      //   const ac = await newAc.save();
      //   return res.status(201).json(ac);
      // } catch (err) {
      //   return res.status(400).send(err);
      // }
    };
    if(req.body.isGettingUser){
        userEmail = req.body.email;
        return 'user_ok';
    };
    }

  module.exports.updateAc = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
      let updatedRecord;

      if(req.body.etat){
        updatedRecord = {
          doneAccessCode: "("+ req.body.accessCode +") "
        };
      }
      if(!req.body.etat){
        updatedRecord = {
          undoneAccessCode: "("+ req.body.accessCode +") "
          // undoneAccessCode: "("+req.body.accessCode+"-undone) ",
        };
      }
  console.log(updatedRecord);
    acModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: updatedRecord },
      { new: true },
      (err, docs) => {
        if (!err){
          res.send(docs);
        }
        else console.log("Update error : " + err);
      }
    );
  };

  module.exports.deleteAc = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    acModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
  };