import React from 'react'

function Notification({errorMessage,type}) {
    const successNotificationStyle = {
      width: "600px",
      color: "green",
      fontStyle: "italic",
      padding:"26px 12px",
      fontSize: 20,
      fontWeight:"bold",
      background:"grey",
      border:"1px solid green",
      margin:'8px'
    };

      const errorNotificationStyle = {
        width: "600px",
        color: "red",
        fontStyle: "italic",
        padding: "26px 12px",
        fontSize: 20,
        fontWeight: "bold",
        background: "grey",
        border: "1px solid red",
        margin: "8px",
      };
  return (
    <div  style={type==="error"?errorNotificationStyle:successNotificationStyle}>{errorMessage}</div>
  )
}

export default Notification