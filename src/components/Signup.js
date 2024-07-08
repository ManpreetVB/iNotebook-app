import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {

    const [credentials, setcredentials] = useState({name:"", email: "", Password: "", cPassword:""});
    let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
const {name,email,Password}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       name,email,Password
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the jwt data andredirect
       localStorage.setItem('token',json.jwtData);
      navigate("/");
      props.showAlert("Account created successfully","Success")
          }
         else{
              props.showAlert("Invalid credentials","Danger")
          }
       };

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };

  return (
    <>
    <div className='container my-3'>
    <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>

      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" className="form-control" id="name"name="name"onChange={onChange} aria-describedby="emailHelp"/>
    
  </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email"name="email"onChange={onChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="Password" className="form-control" id="Password"name="Password"onChange={onChange} minLength={5}required/>
  </div>

  <div className="mb-3">
    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
    <input type="Password" className="form-control" id="cPassword"name="cPassword"onChange={onChange}minLength={5}required/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </>
  )
}

export default Signup
