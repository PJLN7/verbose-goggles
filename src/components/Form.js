import React, { useEffect, useState } from 'react';
import { convertDate } from './shared';

import './styles.css';

const Form = (props) => {
  const { data, setResults, toggleForm } = props;
  const [form, setForm] = useState({});

  useEffect(() => {
    const state = {};

    data.map(({ name, conditional }) =>
      conditional ? null : (state[name] = '')
    );

    setForm({ ...state });
  }, []);

  const setPattern = (name) => {
    if (name == 'phone_number') return '[0-9]{3}-[0-9]{3}-[0-9]{4}';
    else return null;
  };

  const setPlaceholder = (name) => {
    if (name == 'phone_number') return '###-###-####';
    else return null;
  };

  const handleChange = (evt) => {
    let { name, value } = evt.target;

    if (name == 'date_of_birth') {
      value = convertDate(value);
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    for (const field in form) {
      if (!form[field]) return;
      else if (field == 'parental_consent') {
        delete form[field];
      }
    }
    setResults({ ...form });
    toggleForm(true);
  };

  return (
    <div className='form_main'>
      <h1 className='form_title'>Sparrow</h1>
      <form onSubmit={handleSubmit}>
        {data.map(({ name, type, human_label, conditional }) => {
          if (conditional) {
            if (conditional['show_if'](form[conditional['name']])) {
              return (
                <label key={name}>
                  {human_label}
                  <input
                    required
                    className={name}
                    name={name}
                    type={type}
                    onChange={handleChange}
                  />
                </label>
              );
            } else {
              return null;
            }
          }

          return (
            <div className='form_field' key={name}>
              <label>{human_label}</label>
              <input
                required
                className={name}
                name={name}
                type={type}
                pattern={setPattern(name)}
                placeholder={setPlaceholder(name)}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <input className='form_submit_btn' type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Form;
