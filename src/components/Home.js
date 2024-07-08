import React from "react";
import Notes from "./Notes";
//import { useContext } from "react";
//import NoteContext from "../context/notes/NoteContext";
const Home = (props) => {
 const {showAlert}=props
  return (
    <>
        <Notes showAlert={showAlert}/>
    </>
  );
};

export default Home;
