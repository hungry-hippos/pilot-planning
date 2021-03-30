import React,{ useEffect,useState } from 'react';
import Airports from './appFiles/Airports'
import Log from './appFiles/Log'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [isAirports,setIsAirports]=useState(false);
  const [isLog,setIsLog]=useState(true);
  

  return <React.Fragment>
    {isAirports && <Airports />}
    {isLog && <Log />}
    </React.Fragment>
    
}

export default App;
