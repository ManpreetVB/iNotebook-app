const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

//ROUTE1 Get loggedin User Details using :Get"/api/notes/fetchallnotes". login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE2 Add a new note using :POST"/api/notes/addnote". login required

router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),

    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors,return Bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await notes.save();

      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE3 Update an existing note using :PUT"/api/notes/updatenote". login required

router.put(
    "/updatenote/:id", fetchuser,async (req, res) => {
        const { title, description, tag } = req.body;
try{
        // create a newNote object
   const newNotes = {};
    if(title){newNotes.title = title};
    if(description){newNotes.description = description};
    if(tag){newNotes.tag = tag};

//find the note to updated and update it
   let notes =await Notes.findById(req.params.id);
   if(!notes){res.status(404).send("Not found")}

   if(notes.user.toString() !== req.user.id){
    res.status(401).send("Not allowed");
   }

   notes= await Notes.findByIdAndUpdate(req.params.id,{$set: newNotes},{new:true});
   res.json({notes});
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
    }

    })



    //ROUTE4 Delete an existing note using :DELETE"/api/notes/deletenote". login required

router.delete(
    "/deletenote/:id", fetchuser,async (req, res) => {
        const { title, description, tag } = req.body;
try
{
       
//find the note to be deleted and delete it
   let notes =await Notes.findById(req.params.id);
   if(!notes){res.status(404).send("Not found")}


   // Allow the deletions if user owns this 
   if(notes.user.toString() !== req.user.id){
    res.status(401).send("Not allowed");
   }

   notes= await Notes.findByIdAndDelete(req.params.id);
   res.json({"success": "This note hasbeen deleted",notes:notes});

   }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
    }

})

module.exports = router;
