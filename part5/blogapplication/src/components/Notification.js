import React from 'react';

function Notification({ messageType, message }) {
  const errorStyle = {
    background: '#D3D3D3',
    border: '4px solid red',
    color: 'red',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'grid',
    placeItems: 'center',
    width: '98%',
    height: '80px',
    margin: '25px 12px',
  };

  const successStyle = {
    background: '#D3D3D3',
    border: '4px solid green',
    color: 'green',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'grid',
    placeItems: 'center',
    width: '98%',
    height: '80px',
    margin: '25px 12px',
  };
  return (
    <div style={messageType === 'error' ? errorStyle : successStyle} className='notification__container'>
      {message}
    </div>
  );
}

export default Notification;
