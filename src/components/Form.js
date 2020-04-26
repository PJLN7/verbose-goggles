import React, { useEffect, useState } from 'react';
import shared from './shared';

import './styles.css';

const Form = (props) => {
  const { convertDate, validate } = shared;
  const { data, setResults, toggleForm } = props;
  const helperFns = {};
  const [form, setForm] = useState({});

  useEffect(() => {
    const state = {};

    data.map((field) => {
      if (field.conditional) {
        const { tag, type, ...conditional } = field;
        const target = field.conditional['name'];
        helperFns[target] = conditional;
      } else {
        state[field.name] = '';
      }
    });

    setForm({ ...state });
  }, []);

  const setPattern = (name) => {
    switch (name) {
      case 'phone_number':
        return '[0-9]{3}-[0-9]{3}-[0-9]{4}';
      case 'first_name':
      case 'last_name':
        return '[a-zA-Z]+';
      case 'job_title':
        return '^[-a-z0-9,/()&:. ]*[a-z][-a-z0-9,/()&:. ]*$';
      default:
        return null;
    }
  };

  const setPlaceholder = (name) => {
    switch (name) {
      case 'first_name':
        return 'Angel';
      case 'last_name':
        return 'Smith';
      case 'phone_number':
        return '###-###-####';
      case 'job_title':
        return 'e.g., Software Engineer';
      default:
        return null;
    }
  };

  const handleChange = (evt) => {
    let { name, type, value } = evt.target;

    if (type === 'date') {
      value = convertDate(value);
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const currentForm = form;
    for (const field in form) {
      if (!form[field]) return;
      if (helperFns[field] && !helperFns[field](form[field])) {
        delete currentForm[field];
      }
    }
    setResults({ ...currentForm });
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
                    required={!form[name]}
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
                required={!form[name]}
                className={`form_field_input default_field ${name}`}
                name={name}
                type={type}
                pattern={setPattern(name)}
                placeholder={setPlaceholder(name)}
                onChange={handleChange}
                onBlur={validate}
              />
            </div>
          );
        })}
        <button className='form_submit_btn' ype='submit'>
          <p>Submit</p>
          <span className='material-icons'>arrow_forward</span>
        </button>
      </form>
    </div>
  );
};

export default Form;
