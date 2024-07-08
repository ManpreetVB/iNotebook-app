import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  
  const [alert,setAlert] = useState(" ");

  const showAlert=(message,type)=>{
    setAlert({
      message:message,
    type:type
    })
    
    setTimeout(() => {
      setAlert('');
    }, 1500);

  }
  return (
    <>
    <NoteState>
     <Router>
     <Navbar/>
    <Alert alert={alert}/>
      <Routes>
     <Route exact path="/"element={<Home showAlert={showAlert} />}/>
      <Route exact path="/about"element={<About/>}/>
      <Route exact path="/login"element={<Login showAlert={showAlert}/>}/>
      <Route exact path="/signup"element={<Signup showAlert={showAlert}/>}/>
      </Routes>
     </Router>

     </NoteState>
    </>
  );
}

export default App;
