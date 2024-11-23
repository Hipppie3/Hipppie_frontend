import React from 'react'

function FormField({ label, type = "text", name, value, onChange }) {
  return (
    <div className='form-field'>
      <label htmlFor={name}>{label}</label>
      <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      />
    </div>
  )
}

export default FormField
