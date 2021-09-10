const mongoose = require('mongoose');

const oldAcSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
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

module.exports = mongoose.model('oldac', oldAcSchema);