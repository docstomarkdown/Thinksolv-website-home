import React from 'react';
import '../styles/Input.css';

const Textarea = ({ 
  id, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  rows = 6,
  className = '',
  ...props 
}) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={`form-input form-textarea ${className}`}
      {...props}
    />
  );
};

export default Textarea;
