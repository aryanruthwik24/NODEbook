import React, { useEffect,useState } from 'react'
import {Link} from "react-router-dom";
import './Login.css'
import { useNavigate } from "react-router-dom";
import logo from './../../public/notes.png'

function Login ({handleloading}) {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
 
  

  const fsignup=(e)=>{
   e.preventDefault();
   handleloading(true);
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email': loginEmail,'password':loginPassword})
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

    return (
      <div  className="login-page">
                    <div className='login-page-img'><img src={logo} alt="Logo" style={{height:'45px'}}/></div>

            <div  className="login-container">
                    <h2>Login</h2>
                    <form>
                            <div  className="input-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" onChange={(e)=>{setLoginEmail(e.target.value)}} name="email" autoFocus placeholder="Enter your email" required/>
                            </div>
                            <div  className="input-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" onChange={(e)=>{setLoginPassword(e.target.value)}} name="password" placeholder="Enter your password" required/>
                            </div>
                            <button  className="login-button" type="submit" onClick={fsignup}>Log in</button>
                            <h6>New to NODEbook <Link to="/register" >sign Up</Link></h6>
                    </form>
            </div>
            
      </div>
    )

}
export default Login
