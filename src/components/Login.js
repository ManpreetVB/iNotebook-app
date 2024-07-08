import React, { useState } from "react";
import {useNavigate}from 'react-router-dom'
const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", Password: "" });
let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        Password: credentials.Password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
 //save the jwt data andredirect
  localStorage.setItem('token',json.jwtData);
  props.showAlert("Logged in successfully","Success")
  navigate("/");
 
     }
    else{
         props.showAlert("Invalid credentials","danger")
     }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3">
        <h2>Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className=" mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={credentials.email}
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="Password"
              className="form-control"
              id="Password"
              value={credentials.Password}
              name="Password"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
