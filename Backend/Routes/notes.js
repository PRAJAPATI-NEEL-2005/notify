const express = require('express');
const fetchuser = require('../Middleware/fetchuser');
const Notes = require('../Models/Notes');
const router =express.Router();
const { body, validationResult } = require("express-validator");


//ROUTE 1: get all notes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
   const notes=await Notes.find({user:req.user.id});
   res.send(notes);

})


//ROUTE 2: add notes
router.post('/addnote',fetchuser,  [
    body("title", "title must be at least 3 characters").isLength({ min: 3 }),
    body("description", "Please enter a valid description").isLength({min: 5,})],async(req,res)=>{
try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }


      const {title,description,tag,user} = req.body;
        const newNote = new Notes({
        user:req.user.id,
        title:title,
        description:description,
        tag:tag
      });
      const savednote=await newNote.save();

res.json(savednote);


} catch (error) {
       console.error(error.message);
      return res.status(500).json({ error: "Server Error" });
}

})
module.exports=router