import './App.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SGPA from './components/SGPA';

function App() {
  const [type, setType] = useState();
  return (
    <div className="App">
      {'What to calculate?  '}
      <Button className='' variant='info' onClick={() => setType("cgpa")}>{'CGPA'}</Button>
      {' or  '}
      <Button variant='info' onClick={() => setType("sgpa")}>{'Just SGPA'}</Button>
      <br />
      {
        type === "sgpa" ? <SGPA /> : <></>
      }
      {
        type === "cgpa" ? <div></div> : <></>
      }

    </div>
  );
}

export default App;
