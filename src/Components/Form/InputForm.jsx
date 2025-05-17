import React from 'react';
import styles from './InputForm.module.css';
import Error from '../HelpersComponents/Error';

function InputForm({ label, type, name, error, value, onChange, onBlur }) {
  return (
    <div className={styles.controls}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete='true'
      />
      <Error error={error} />
    </div>
  );
}

export default InputForm;
