import React from "react";

const Alert = (props) => {
  const capital =(word)=>{
    if (!word) return '';
    const lower= word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <>
       <div style={{height:'50px'}}>
    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong>{capital(props.alert.type)}</strong>:{props.alert.message}
  </div>
    </div>
    </>
  );
};

export default Alert;
