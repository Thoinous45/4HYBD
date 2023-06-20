const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { story } = require("../controllers/user");
let Schema = mongoose.Schema

const locationSchema = mongoose.Schema(
  {
    longitude: { type: Number, required: false },
    latitude: { type: Number, required: false },
    _id : false,
  },
  {timestamps: false},
  {require: false}
);


const storySchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    description: { type: String, required: false },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    location : locationSchema,
    _id : false,
  },
  {timestamps: true},
  {require: false},
);



const userSchema = mongoose.Schema(
  {
    firstname : {type:String , required :true},
    lastname : {type:String , required :true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    story : storySchema ,
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
