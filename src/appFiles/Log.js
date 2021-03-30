import React,{useState} from 'react'
import logImgLeft from './logImgLeft.png'
import Button from 'react-bootstrap/Button'
import './Log.css'


const EntryBtns=(props)=>{

    const [entries,setEntries]=props.stateVars;
    const addEntry=()=>{
        var update=entries.concat([1]);
        setEntries(update);
    }

    return <div id='entryBtns'>
        <Button variant='primary' id='addEntryBtn' onClick={addEntry}>+</Button>
        <div id='menuTag'>
            <div id='arrowLeft'></div>
            <input type="radio" id="l/o" name="l/o" /><label htmlFor="l/o">L/O</label><br/>
            <input type="radio" id="enRoute" name="enRoute" /><label htmlFor="enRoute">En Route</label><br/>
            <input type="radio" id="practiceLanding" name="practiceLanding" /><label htmlFor="practiceLanding">Practice Landing</label><br/>
        </div>
    </div>
}
const FirstEntry=()=>{
    return <div className='entry firstEntry'>
        <input type='text' value='L/O' />
    </div>
}
const Entry=()=>{
    return <div className='entry'>
        <input type='text' value='L/O' />
    </div>
}

const Log=()=>{
    const [entries,setEntries]=useState([])
    const stateVars=[entries,setEntries];
    return <div id='mainLog'>
        <img src={logImgLeft} alt="" id='logImg'/>
        <FirstEntry />
        {entries.map(()=>{
            return <Entry />
        })}
        <EntryBtns stateVars={stateVars}/>
    </div>
}

export default Log