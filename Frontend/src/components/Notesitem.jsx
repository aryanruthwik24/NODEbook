import React from 'react'
import { useNavigate } from "react-router-dom";
import{ useEffect, useState } from 'react'






function Notesitem(props) {
    const navigate = useNavigate();
    const [utag,setUtag]=useState("");
    const [utitle,setUtitle]=useState("");
    const [udescription,setUdescription]=useState("");
    const [updatedNotes,setUpdatedNotes]=useState({});

    const delnote=(e,id)=>{
        e.preventDefault();
        props.handleloading(true);
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/deletenote`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'_id':id})
        })
        
          .then((res) =>{ return res.json()
          })
          .then((data) => {
            
            if(data.message==="success"){
           props.ShowAllNotes();
           props.handleloading(false);
            }
          else{
          alert(data.message);
           props.handleloading(false);
          }
          
          })
          .catch(err => console.log(err))
    
    }
    const updatenotes=(e,id)=>{
        e.preventDefault();
        
       
        props.handleloading(true);
        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/updatenotes`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'_id':id,'title':utitle,'tag':utag,'description':udescription})
        })
        
          .then((res) =>{ return res.json()
          })
          .then((data) => {
            
            if(data.message==="success"){
               props.ShowAllNotes();
                props.handleloading(false);

           
            }
          else{
          alert(data.message);
          props.handleloading(false);
          }
          
          })
          .catch(err => console.log(err))
        
    }

    const openModal = (e,id,tag,title,description) => {
        // Get a reference to the modal element
        const modal = document.getElementById('myModal');
      
        // Open the modal using Bootstrap's JavaScript API
        if (modal) {
          const modalInstance = new window.bootstrap.Modal(modal);
          modalInstance.show();
        }
    localStorage.setItem('id',id);
    const taginput=document.getElementById('exampleFormControlInput3');
    const titleinput=document.getElementById('exampleFormControlInput4');
    
    const descriptioninput=document.getElementById('exampleFormControlTextarea2');
    taginput.value=tag;
    setUtag(tag);
    titleinput.value=title;
    setUtitle(title);
    descriptioninput.value=description;
    setUdescription(description);  
    
    


     
      
      }
     
    
 console.log(utag);
        console.log(utitle);
        console.log(udescription);

  return (
    <div>

<div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
  <input type="text" className="form-control"  onChange={(e)=>{setUtag(e.target.value)}} id="exampleFormControlInput3" placeholder="Tag"/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
  <input type="text" className="form-control"  onChange={(e)=>{setUtitle(e.target.value)}} id="exampleFormControlInput4" placeholder="Title"/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea className="form-control"  onChange={(e)=>{setUdescription(e.target.value)}} id="exampleFormControlTextarea2" rows="5"></textarea>
</div>
            </div>
            <div className="modal-footer">
             
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={(e)=>updatenotes(e,localStorage.getItem('id'))}>Update</button>
            </div>
          </div>
        </div>
      </div>





      <div className="card text-bg-dark mb-3 mx-2" style={{ height: '20rem' }}>
  <div className="card-header">
  <div className="d-flex align-items-center justify-content-between">
  <h4>#{props.tag}</h4>
  <div>
  <i className="fa-solid fa-trash mx-2" style={{ color: '#ffffff'}} onClick={(e)=>delnote(e,props.id)}></i>
    <i className="fa-solid fa-pen-to-square mx-2" style={{ color: '#ffffff'}} onClick={(e)=>openModal(e,props.id,props.tag,props.title,props.description)} ></i>
    </div>
 </div>
  </div>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.description}</p>
   
    
  </div>
</div>




    </div>
  )
}

export default Notesitem
