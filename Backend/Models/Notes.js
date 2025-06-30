const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
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
    type: date,
    required :true,
    default :date.now
 }
});
module.exports =mongoose.model('note',noteSchema);