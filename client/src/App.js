import './App.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SGPA from './components/SGPA';

function App() {
  const [type, setType] = useState();
  return (
    <div className="App">
      What to calculate?
      <Button className='' onClick={() => setType("cgpa")}>CGPA</Button>
      or
      <Button onClick={() => setType("sgpa")}>Just SGPA</Button>

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
