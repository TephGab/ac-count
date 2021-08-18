const acModel = require("../models/AcModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
// const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);

//Auth

module.exports.getAc = (req, res) => {
  acModel.find((err, docs) => {
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
        email: 'tephgab@gmail.com',
        doneAccessCode: formatedAcCodes
      });
      try {
        const ac = await newAc.save();
        return res.status(201).json(ac);
      } catch (err) {
        return res.status(400).send(err);
      }
    };
    if(req.body.etat === false){
      const formatedAcCodes = "("+req.body.data.accessCode+"-undone) ";
      const newAc = new acModel({
        email: 'tephgab@gmail.com',
        undoneAccessCode: formatedAcCodes
      });
      try {
        const ac = await newAc.save();
        return res.status(201).json(ac);
      } catch (err) {
        return res.status(400).send(err);
      }
    };
    }

  module.exports.updateAc = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
      let updatedRecord;
      console.log(req.body.etat);
      if(req.body.etat){
        updatedRecord = {
          doneAccessCode: "("+req.body.accessCode+"-done) ",
        };
      }
      if(!req.body.etat){
        updatedRecord = {
          undoneAccessCode: "("+req.body.accessCode+"-undone) ",
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

  // module.exports.updateAc = async (req, res) => {
  //   if (!ObjectID.isValid(req.params.id))
  //     return res.status(400).send("ID unknown : " + req.params.id);
  
  //   try {
  //     await acModel.findByIdAndUpdate(
  //       req.params.id,
  //       {
  //         $addToSet: { doneAccessCode: req.body.doneAccessCode },
  //       },
  //       { new: true },
  //       (err, docs) => {
  //         if (err) return res.status(400).send(err);
  //       }
  //     );
  //   } catch (err) {
  //     return res.status(400).send(err);
  //   }
  // };

  