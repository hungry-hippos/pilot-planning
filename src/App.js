
import './App.css';
import React,{ useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

function App() {
  const getAirportData=(url)=>{
    axios.get(url)
    .then((res)=>{
      const $=cheerio.load(res.data);
      if (!$('#aptcomms').text()){
        document.getElementById('airportData').textContent='NOTHING FOUND, FUCK YOU ~~C===3';
      }else{
        document.getElementById('airportData').textContent=($('#aptcomms').text());
      }
      
    })
    .catch(err=>console.log(err))
  }

  const getAirportNames=(e)=>{

    //block form from auto-submitting
    e.preventDefault();

    //empties fields, extract input airport name, fetch possible airports from skyvector
    document.getElementById('airportNames').textContent="";
    document.getElementById('airportData').textContent="";
    const name=document.getElementById('airportName').value;
    var urlName="https://skyvector.com/search/site/";
    for (var i=0;i<name.length;i++){
      if (name[i]!==" "){
        urlName+=name[i];
      }else{
        urlName+="%2520";
      }
    }

    axios.get(urlName)
    .then((res)=>{
      //parses string html into virtual DOM
      const $=cheerio.load(res.data);

      //extracts port names + hrefs from DOM
      var results=[];
      $('.search-results').find('a').each(function(i){
        results[i]={
          name:$(this).text(),
          href:$(this).attr('href')
        }
      });
      return results;
    })
    .then((res)=>{
      //displays results on UI and loads onClick listener to get its respective data
       res.forEach((elem)=>{
         const portName=document.createElement('div');
         portName.setAttribute('href',elem.href);
         portName.textContent=elem.name;
         portName.addEventListener('click',()=>{
           getAirportData(elem.href);
         })
         document.getElementById('airportNames').appendChild(portName);
       })
    })
    .catch(err=>console.log(err))

    
  }

  useEffect(()=>{});

  return <React.Fragment>
    <div id="mainApp">
      <form>
      <label for='airportName'>AIRPORT NAME?</label>
      <input type="text" id='airportName' name='airportName'></input>
      <button onClick={getAirportNames}>SUBMIT</button>
      </form>
    </div>

    <div id='airportNames'></div>
    <div id='airportData' style={{marginTop:'100px',fontSize:'25px'}}></div>

    </React.Fragment>
    
}

export default App;
