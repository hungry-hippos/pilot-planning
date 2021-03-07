import React from 'react'
import axios from 'axios';
import cheerio from 'cheerio';
import './Airports.css'

const DataTable=()=>{
    return <table id='dataTable'>
        <tbody>
        <tr>
            <td>Departure Elevation</td>
            <td id='depElev'></td>
        </tr>
        <tr>
            <td>Clearance Delivery</td>
            <td id='clncDeliv'></td>
        </tr>
        <tr>
            <td>Departure Ground Control</td>
            <td id='depGndCont'></td>
        </tr>
        <tr>
            <td>Departure Tower</td>
            <td id='depTower'></td>
        </tr>
        <tr>
            <td>ATIS</td>
            <td id='depATIS'></td>
        </tr>
        <tr>
            <td>ASOS</td>
            <td id='depASOS'></td>
        </tr>
        <tr>
            <td>AWOS</td>
            <td id='depAWOS'></td>
        </tr>
        <tr>
            <td>Departure Frequencies</td>
            <td id='departure'></td>
        </tr>
        <tr>
            <td>Destination Elevation</td>
            <td id='destElev'></td>
        </tr>
        <tr>
            <td>Approach Control</td>
            <td id='apcCont'></td>
        </tr>
        <tr>
            <td>Approach Tower</td>
            <td id='apcTower'></td>
        </tr>
        <tr>
            <td>Approach Ground Control</td>
            <td id='apcGndCont'></td>
        </tr>
        </tbody>
    </table>
}

const Airports=()=>{
    
    const getAirportNames=(e,isDeparture)=>{

    //block form from auto-submitting
    e.preventDefault();

    //empties suggested airports, extract input airport name, fetch possible airports from skyvector
    document.getElementById('airportNames').textContent="";
    const name=(isDeparture)?document.getElementById('departingAirport').value:document.getElementById('approachingAirport').value;

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

            if (isDeparture){
                portName.addEventListener('click',()=>{
                    getDepartureAirportData(elem.href);
                })
            }else{
                portName.addEventListener('click',()=>{
                    getApproachingAirportData(elem.href);
                })
            }
            
            document.getElementById('airportNames').appendChild(portName);
        })
    })
    .catch(err=>console.log(err))
    }

    const getDepartureAirportData=(url)=>{
        axios.get(url)
        .then((res)=>{
          const $=cheerio.load(res.data);
          if (!$('#aptcomms').text()){
            document.getElementById('airportData').textContent='NOTHING FOUND, FUCK YOU ~~C===3';
          }else{
            const aptData=$('.aptdata').text().toLowerCase();
            const th=$('th');

            //get elevation
            for (var i=0;i<aptData.length;i++){
                var nextWord="";
                while(aptData[i]!==" "){
                    nextWord+=aptData[i];
                    i++;
                }
                if (nextWord==='elevation'){
                    while(aptData[i]!=='l'){
                        nextWord+=aptData[i];
                        i++;
                    }
                    nextWord+='l';
                    document.getElementById('depElev').textContent=nextWord;
                    break;
                }
            }            

            //get ATIS,ASOS,AWOS
            th.each((j,elem)=>{
                const text=$(elem).text().toLowerCase();
                
                //extract last word
                var lastWord="";
                for (let i=text.length-1;i>-1;i--){
                    if (text[i]===" ")
                        break;
                    lastWord=text[i]+lastWord;
                }
                
                //check in last word for substring atis/asos/awos and append data to table
                for (let i=0;i<lastWord.length;i++){
                    if (lastWord[i]==='a'){
                        var keyWord='';
                        while(i<lastWord.length){
                            keyWord+=lastWord[i];
                            i++;
                            switch(keyWord){
                                case 'atis':
                                    document.getElementById('depATIS').textContent=$(elem).next().text();
                                    break;
                                case 'awos':
                                    document.getElementById('depAWOS').textContent=$(elem).next().text();                                    
                                    break;
                                case 'asos':
                                    document.getElementById('depASOS').textContent=$(elem).next().text();                                    
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }                
            })

            //get tower,ground,departure,delivery
            th.each((j,elem)=>{
                const text=$(elem).text().toLowerCase();
                
                //extract last word
                var lastWord="";
                for (let i=text.length-2;i>-1;i--){
                    if (text[i]===" ")
                        break;
                    lastWord=text[i]+lastWord;
                }

                switch(lastWord){
                    case 'tower':
                        document.getElementById('depTower').textContent=$(elem).next().text();
                        break;
                    case 'departure':
                        document.getElementById('departure').textContent=$(elem).next().text();
                        break;
                    case 'ground':
                        document.getElementById('depGndCont').textContent=$(elem).next().text();
                        break;
                    case 'delivery':
                        document.getElementById('clncDeliv').textContent=$(elem).next().text();
                        break;
                    default:
                        break;
                }
            })
          }
        })
        .catch(err=>console.log(err))
    }
    const getApproachingAirportData=(url)=>{

    }

    return <React.Fragment>
        <div>
            <form id='departingForm'>
                <label htmlFor='departingAirport'>Departing Airport</label>
                <input type="text" id='departingAirport' name='departingAirport'></input>
                <button onClick={(e)=>{getAirportNames(e,true)}}>SUBMIT</button>
            </form>
            <form id='approachingForm'>
                <label htmlFor='airportName'>Approaching Airport</label>
                <input type="text" id='approachingAirport' name='approachingAirport'></input>
                <button onClick={(e)=>{getAirportNames(e,false)}}>SUBMIT</button>
            </form>
        </div>

        <div id='airportNames'></div>
        <DataTable />
    </React.Fragment>
    
}

export default Airports