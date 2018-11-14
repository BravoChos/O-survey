//SurveyField contains logic to render a simgle
//label and text input
import React from 'react';

// below {input, label ...} is props provided by Field (redux)

export default ({input, label, meta: { error, touched }}) => {
  return (
    <div  >
      {/* <input {...input} /> */}
      <label>{label} </label>
      <input {...input} style={{ marginBottom: '5px' }}/>
      <div className="red-text" style={{ marginBottom: '20px' }}>
      {touched && error}        
      </div>
    </div>
  );
};

