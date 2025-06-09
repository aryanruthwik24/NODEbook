import React, { Component } from 'react'
import { useEffect,useState } from 'react'
import './Register.css'
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  const [registeremail, setregisterEmail] = useState("");
  const [registerpassword, setregisterPassword] = useState(""); 
  const [registername, setName] = useState("");
 // const [loginPassword, setLoginPassword] = useState("");




  function fregister(e){
    e.preventDefault();
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email': registeremail,'password':registerpassword,'name': registername})
    })
      .then(res => res.json())
      .then(data => {
        if(data.message==="User registered successfully"){
           
        
        navigate('/');
       
        }
      else{
          alert(data.message)
         
      }
      })
      .catch(err => console.log(err))
  
  }
    return (
      <div  className="register-page">
         <div  className="register-container">
    <form>
      <div  className="input-group">
        <label htmlFor="firstName">First Name<span>*</span>:</label>
        <input type="text" id="firstName" onChange={(e)=>{setName(e.target.value)}} name="firstName" placeholder="Enter your first name" required/>
      </div>
      <div  className="input-group">
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required/>
      </div>
      <div  className="input-group">
        <label htmlFor="age">Age:</label>
        <input type="text" id="age" name="age" placeholder="Enter your age" required/>
      </div>
      <div  className="input-group">
        <label htmlFor="email">Email<span>*</span>:</label>
        <input type="email" id="email" onChange={(e)=>{setregisterEmail(e.target.value)}} name="email" placeholder="Enter your email" required/>
      </div>
      <div  className="input-group">
        <label htmlFor="password">Password<span>*</span>:</label>
        <input type="password" id="password" onChange={(e)=>{setregisterPassword(e.target.value)}} name="password" placeholder="Enter your password" required/>
      </div>
      <button  className="register-button" type="submit" onClick={fregister}>Register</button>
    </form>
    <p>already have an account? <Link to="/">Log in</Link></p>
  </div>
      </div>
    )

}
export default Register
