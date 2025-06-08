import React, { useEffect,useState } from 'react'
import {Link} from "react-router-dom";
import './Login.css'
import { useNavigate } from "react-router-dom";

function Login (props) {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
 
  

  const fsignup=(e)=>{
   e.preventDefault();
    fetch('http://localhost:8003/login', {
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
          localStorage.setItem('useremail',data.useremail);
          localStorage.setItem('accesstoken', data.accesstoken)
        navigate('/home');
       
        
        }
      else
      alert(data.message);
       // console.log(data.accesstoken)
        //localStorage.setItem('accesstoken', data.accesstoken)
      })
      .catch(err => console.log(err))

  }

    return (
      <div  className="login-page">
      
            <div  className="login-container">
                    <h2>Login</h2>
                    <form>
                            <div  className="input-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" onChange={(e)=>{setLoginEmail(e.target.value)}} name="email" placeholder="Enter your email" required/>
                            </div>
                            <div  className="input-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" onChange={(e)=>{setLoginPassword(e.target.value)}} name="password" placeholder="Enter your password" required/>
                            </div>
                            <button  className="login-button" type="submit" onClick={fsignup}>Log in</button>
                            <h6>New to iNoteBook <Link to="/register" >sign Up</Link></h6>
                    </form>
            </div>
            
      </div>
    )

}
export default Login
