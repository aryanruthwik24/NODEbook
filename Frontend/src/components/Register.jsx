import React, { Component } from 'react'
import { useEffect,useState } from 'react'
import './Register.css'
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register({handleloading}) {
  const navigate = useNavigate();
  const [registeremail, setregisterEmail] = useState("");
  const [registerpassword, setregisterPassword] = useState(""); 
  const [registername, setName] = useState("");

function validateCredentials(email, password) {
  const result = {
    isValidEmail: false,
    isValidPassword: false,
    message: ""
  };

  // Email format validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  result.isValidEmail = emailRegex.test(email);

  // Password validation: min 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  result.isValidPassword = passwordRegex.test(password);

  // Set message based on validation result
  if (!result.isValidEmail && !result.isValidPassword) {
    result.message = "Invalid email and password format.";
  } else if (!result.isValidEmail) {
    result.message = "Invalid email format.";
  } else if (!result.isValidPassword) {
    result.message = "Password must be at least 8 characters long and include uppercase, lowercase, and a number.";
  } else {
    result.message = "Email and password format are valid.";
  }

  return result;
}




  function fregister(e){
    e.preventDefault();
    
    let result =validateCredentials(registeremail,registerpassword);
    if(result.message!=='Email and password format are valid.'){
      alert(result.message);
    }
    else{
      handleloading(true);
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
           
      
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email': registeremail,'password':registerpassword})
    })
    
      .then((res) =>{ return res.json()
      })
      .then((data) => {
        
        if(data.message==="User logged in Successfully"){
          handleloading(false);
          localStorage.setItem('useremail',data.useremail);
          localStorage.setItem('accesstoken', data.accesstoken)
        navigate('/home');
       
        
        }
      else{
      alert(data.message);
      handleloading(false);
      }
      })
      .catch(err => console.log(err))
       
        }
      else{
          alert(data.message)
         handleloading(false);
      }
      })
      .catch(err => console.log(err))

    }
  }
    return (
      <div  className="register-page">
         <div  className="register-container">
    <form>
      <div  className="input-group">
        <label htmlFor="firstName">First Name<span>*</span>:</label>
        <input type="text" id="firstName" onChange={(e)=>{setName(e.target.value)}} autoFocus name="firstName" placeholder="Enter your first name" required/>
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
