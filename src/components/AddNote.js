import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [notes, setNotes] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(notes.title, notes.description, notes.tag);
    setNotes({
        title: "",
        description: "",
        tag: "default",
      });
      props.showAlert("Updated successfully","Success");
  };
  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className=" mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={notes.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={notes.description}
              onChange={onChange}
              minLength={5}required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={notes.tag}
              onChange={onChange}
              minLength={5}required
            />
          </div>
          
          <button disabled={notes.title.length<5 || notes.description.length<5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
