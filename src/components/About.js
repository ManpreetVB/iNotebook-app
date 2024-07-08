import React from "react";
//import { useContext } from 'react';
//import NoteContext from '../context/notes/NoteContext';
const About = (props) => {
  let myStyle = {
    color: props.mode === "dark" ? "White" : "black",
    backgroundColor: props.mode === "dark" ? "black" : "white",
  };
  return (
    <>
      <div className="container" style={myStyle}>
        <h1 className="my-3"> Welcome to iNnotebook</h1>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                style={myStyle}
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                <strong>About iNotebook</strong>
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                iNotebook is a modern note-taking application designed to
                streamline your organizational needs. Developed with React on
                the frontend and a robust Node.js/Express backend, iNotebook
                allows users to securely manage their personal notes with ease.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                style={myStyle}
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                <strong>Key Features</strong>
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Note Management: Create, update, and delete notes effortlessly.
                <br></br>
                User Authentication: Secure login, signup, and logout
                functionalities ensure your data remains private and accessible
                only to you.<br></br>
                Personalized Experience: Each user has exclusive access to their
                own set of notes, providing a customized and confidential
                environment.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                style={myStyle}
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                <strong>Our Mission</strong>
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                At iNotebook, our mission is to empower users with a reliable
                tool for organizing thoughts, tasks, and ideas. Whether you're a
                student, professional, or creative individual, iNotebook adapts
                to your needs, offering a seamless experience across devices.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
