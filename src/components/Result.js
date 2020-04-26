import React from 'react';
import './styles.css';

const Result = (props) => {
  const { data, toggleForm } = props;

  const handleClick = () => {
    toggleForm(false);
  };

  return (
    <div className='result_main'>
      <p>{`{`}</p>
      <div className='result_data'>
        {Object.entries(data).map(([key, value]) => (
          <p key={key}>{`${key}: ${value}`}</p>
        ))}
      </div>
      <p>{`}`}</p>
      <button className='result_back_btn' onClick={handleClick}>
        Go back
      </button>
    </div>
  );
};

export default Result;
