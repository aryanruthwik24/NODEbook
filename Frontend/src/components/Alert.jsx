import React from 'react'

function Alert(props) {
  return (
    <div>
    {props.alert &&  <div class="alert alert-success"  style={{marginTop:'56px',display:'none'}} role="alert">
  This is a success alert—check it out!
</div>}
    </div>
  )
}

export default Alert
