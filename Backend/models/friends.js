const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

const friendsSchema = mongoose.Schema(
  {
    requester: { type: Schema.Types.ObjectId, ref: "Users" },
    recipient: { type: Schema.Types.ObjectId, ref: "Users" },
    status: { type: Number }, // 1: requested, 2: friends , 3: blocked
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friends", friendsSchema);
