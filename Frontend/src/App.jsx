
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from './components/Notes';
import Login from './components/Login';
import Register from './components/Register';
import React, {useState } from 'react'
import Alert from './components/Alert';


function App() {
  const [alert, setAlert] = useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }

  return (
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
      <Routes>
      <Route path='/home' element={<Notes />} />
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
   


  
  );
}

export default App;
