const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   },
 title:{
    type: String,
    required :true
 },
  description:{
    type: String,
    required :true
 },
  tag:{
    type: String,
    default:"general"
 },
  date:{
    type: Date,
    required :true,
    default :Date.now
 }
});
module.exports =mongoose.model('note',noteSchema);