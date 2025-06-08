import React from 'react'
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
const logout=()=>{
  localStorage.removeItem("useremail");
  localStorage.removeItem("accesstoken");
  navigate('/');
}

  
  return (
    <>
    {localStorage.getItem('accesstoken') &&  <div>



    
     <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
  <i className="fa-solid fa-bars fa-xl mx-2" style={{ color: '#ffffff'}}></i>
    <a className="navbar-brand" href="#">NODEbook</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          
        
        </li>
       
      </ul>
      <form className="d-flex" role="search">
        
        <button className="btn btn-success" onClick={logout} type="submit">Logout</button>
      </form>
    </div>
  </div>
</nav>
      
    </div>}
    </>
  )
}

export default Navbar
