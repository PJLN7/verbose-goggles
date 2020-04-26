import React, { useState } from 'react';
import Form from './components/Form';
import Result from './components/Result';
import data from './data';

import './App.css';

function App() {
  const [results, setResults] = useState({});
  const [validForm, toggleForm] = useState(false);

  return (
    <div className='App'>
      <div className='Content'>
        {validForm ? (
          <Result data={results} toggleForm={toggleForm} />
        ) : (
          <Form
            data={data}
            setResults={setResults}
            toggleForm={toggleForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
