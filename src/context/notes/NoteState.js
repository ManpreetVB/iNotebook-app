import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YThmNDYyNTFiNzliNGViZjNhNzZlIn0sImlhdCI6MTcxOTMxMDIyNn0.akpC_1srogsW19DRJsxTPGXHmpPSDypfjw-AA-jG7g4";
     
  
  // get all note
  const getNotes = async() => {
    
    //API call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'jwt-Data': localStorage.getItem('token')
          },
       
      });
      const json=await response.json()
      console.log(json)
      setNotes(json);
    } 


  // Add note
  const addNote = async(title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'jwt-Data': localStorage.getItem('token')
            
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      console.log(json)
const notes = json;
    //logic to add note in client
    //console.log("Adding a new note");
    //const notes = {
      //_id: "66337bdd2986cab0be2c4282817",
      //user: "667a8f46251b79b4ebf3a76e",
      //title: title,
      //description: description,
      //tag: tag,
      //date: "2024-06-26T09:19:37.190Z",
     // __v: 0,
    //};

    setNotes((prevNotes) => prevNotes.concat(notes));
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
          'jwt-Data': localStorage.getItem('token')
         
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await response.json();
    console.log(json);

    let newNotes=JSON.parse(JSON.stringify(notes))
    // logic to edit in client(frontend react)
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;

      }
      
    }
    console.log(newNotes);
    setNotes(newNotes);
  };

  // Delete note

  const deleteNote =async (id) => {

    //api call
   
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'jwt-Data': localStorage.getItem('token')
          
        },
       
      });
      const json= await response.json();
console.log(json)

  //logic to delete note in client
  
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
