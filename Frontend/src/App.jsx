
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from './components/Notes';
import Login from './components/Login';
import Register from './components/Register';
import React, {useState } from 'react'
import Alert from './components/Alert';
import Loader from './components/Loader';

function App() {
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(false);
  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
const handleloading=(param)=>{
setLoading(param);
}
const isAuthenticated=localStorage.getItem('accesstoken');
  return (
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    {loading && <Loader/>}
      <Routes>
      <Route path='/home' element={isAuthenticated ? <Notes handleloading={handleloading} /> :<Login handleloading={handleloading} />} />
      <Route path='/' element={<Login handleloading={handleloading} />} />
      <Route path='/register' element={<Register handleloading={handleloading} />} />
      </Routes>
    </Router>
   


  
  );
}

export default App;
