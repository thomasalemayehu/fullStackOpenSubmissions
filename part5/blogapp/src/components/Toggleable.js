import React from "react";
import { useState } from "react";

function Toggleable({ buttonLabel, cancelButtonLabel, children }){
  const [isVisible, setIsVisible] = useState(false);

  const displayStyle = { display: "" };
  const hideStyle = { display: "none" };

  return (
    <>
      <button
        style={isVisible ? hideStyle : displayStyle}
        onClick={() => setIsVisible(true)}
      >
        {buttonLabel}
      </button>

      <div style={isVisible ? displayStyle : hideStyle}>{children}</div>

      <button
        style={isVisible ? displayStyle : hideStyle}
        onClick={() => setIsVisible(false)}
      >
        {cancelButtonLabel}
      </button>
    </>
  );
}

export default Toggleable;
