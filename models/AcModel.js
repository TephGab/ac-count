const mongoose = require('mongoose');

const AcSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    doneAccessCode: {
      type: [String]
    },
    undoneAccessCode: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ac', AcSchema);