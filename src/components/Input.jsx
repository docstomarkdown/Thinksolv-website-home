import React from 'react';
import '../styles/Input.css';

const Input = ({ 
  id, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  minLength,
  maxLength,
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      className={`form-input ${className}`}
      {...props}
    />
  );
};

export default Input;
