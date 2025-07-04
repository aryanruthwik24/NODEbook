import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Notesitem from './Notesitem';
import './Notes.css'


function Notes({handleloading}) {
  const navigate = useNavigate();
const [notesTag,setnotesTag]=useState("");
const [notesTitle,setnotesTitle]=useState("");
const [notesDescription,setnotesDescription]=useState("");

//const[email2,setemail2]=useState("aryanruthwik24@gmail.com");
//setemail2(props.email);
const[allnotes,setAllnotes]=useState([]);




const createnotes=(e)=>{
  e.preventDefault();
  handleloading(true);
  fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/createTOdo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'email':localStorage.getItem('useremail'),'tag':notesTag,'title':notesTitle,'description':notesDescription})
  })
  
    .then((res) =>{ return res.json()
    })
    .then((data) => {
      handleloading(false);
      if(data.message==="notes created successfully"){
        const taginput = document.getElementById('exampleFormControlInput1');
        taginput.value="";
        const titleinput = document.getElementById('exampleFormControlInput2');
        titleinput.value="";
        const descriptioninput = document.getElementById('exampleFormControlTextarea1');
        descriptioninput.value="";
        setnotesDescription('');
        setnotesTag('');
        setnotesTitle('');
       ShowAllNotes();
        
      
      }
    else
    alert(data.message);
    
    })
    .catch(err => console.log(err))

  
}

const ShowAllNotes=(e)=>{
  handleloading(true);
  fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/getAllTodos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'email' :localStorage.getItem('useremail')})
  })
  
    .then((res) =>{ return res.json()
    })
    .then((data) => {
      handleloading(false);
      if(data.message==="success"){
       // console.log(data.notesF);
        setAllnotes(data.notesF);
        //console.log(allnotes);
       // navigate('/home');
     
      
      
      }
    else
    alert(data.message);
    
    })
    .catch(err => console.log(err))
}
useEffect(()=>{
  ShowAllNotes();
},[])




  return (
   <>
  
    {localStorage.getItem('accesstoken') && <div>
    
     <div  className="inputContainer" >
     <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
  <input type="text" onChange={(e)=>{setnotesTag(e.target.value)}} className="form-control" id="exampleFormControlInput1" placeholder="Tag"/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
  <input type="text" onChange={(e)=>{setnotesTitle(e.target.value)}} className="form-control" id="exampleFormControlInput2" placeholder="Title"/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea onChange={(e)=>{setnotesDescription(e.target.value)}} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
</div>
<button type="button" onClick={createnotes} className="btn btn-success">Create</button>


    </div>


    


    <div className='NotesItemContainer'>
{allnotes.map((element)=>{
            return   <div className='col-md-6' key={element._id} >
            <Notesitem title={element.title} ShowAllNotes={ShowAllNotes} handleloading={handleloading}description={element.description } tag={element.tag} id={element._id} />
           
            </div>

        })} 
</div>
</div>}
</>
    
   
  )
}

export default Notes
