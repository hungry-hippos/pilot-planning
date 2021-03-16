import React, { useEffect } from 'react'
import axios from 'axios';
import cheerio from 'cheerio';
import {BsSearch} from 'react-icons/bs'
import Button from 'react-bootstrap/Button'
import './Airports.css'

const DataTable=()=>{

    const editRhInputs=()=>{
        const inputs=document.getElementsByClassName('rhInput');
        for (var i=0;i<inputs.length;i++){
            inputs[i].disabled=false;
        }
    }

    useEffect(()=>{
        const inputs=document.getElementsByClassName('rhInput');
        for (var i=0;i<inputs.length;i++){
            inputs[i].disabled=true;
        }
    })
    return <div id='rightHalf'>
        <h3>DEPARTING</h3>
        <h4 id='depAirport'>Please search and select an airport.</h4>
        <hr/>
        <table id='departingTable'>
            <tbody>
            <tr>
                <td>Dep. Elevation</td>
                <td><input id='depElev' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>Clearance Delivery</td>
                <td><input id='clncDeliv' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>Dep. Ground Control</td>
                <td><input id='depGndCont' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>Dep. Tower</td>
                <td><input id='depTower' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>ATIS</td>
                <td><input id='depATIS' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>ASOS</td>
                <td><input id='depASOS' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>AWOS</td>
                <td><input id='depAWOS' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>Dep. Frequencies</td>
                <td><input id='departure' className='rhInput'></input></td>
            </tr>
            </tbody>
        </table>
        
        <h3>DESTINATION</h3>
        <h4 id='destAirport'>Please search and select an airport.</h4>
        <hr/>
        <table id='approachingTable'>
            <tbody>
            <tr>
                <td>Dest. Elevation</td>
                <td><input id='destElev' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>Apc. Control</td>
                <td><input id='apcCont' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>Apc. Tower</td>
                <td><input id='apcTower' className='rhInput'></input></td>
            </tr>
            <tr>
                <td>Apc. Ground Control</td>
                <td><input id='apcGndCont' className='rhInput'></input></td>
            </tr>
            </tbody>
        </table>
        
        <Button variant='primary' className='rhBtn'>SAVE AND CONTINUE</Button>
        <Button variant='primary' onClick={editRhInputs} className='rhBtn'>EDIT</Button>
    </div>
}
const BrowseAirports=()=>{
    const getAirportNames=(e,isDeparture)=>{

        //block form from auto-submitting
        e.preventDefault();
    
        //empties suggested airports, extract input airport name, fetch possible airports from skyvector
        document.getElementById('airportNames').textContent="";
        const name=(isDeparture)?document.getElementById('departingAirport').value:document.getElementById('approachingAirport').value;
    
        //url is broken for proxy usage (API routes on setUpProxy.js)
        // var urlName="https://skyvector.com/search/site/";
        var urlName="/search/site/";
        for (var i=0;i<name.length;i++){
            if (name[i]!==" "){
            urlName+=name[i];
            }else{
            urlName+="%2520";
            }
        }
        console.log(urlName);

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
                portName.classList.add('availableAirport');
                portName.textContent=elem.name;
    
                if (isDeparture){
                    portName.addEventListener('click',()=>{
                        document.getElementById('depAirport').textContent=elem.name;
                        getDepartureAirportData(elem.href);
                    })
                }else{
                    portName.addEventListener('click',()=>{
                        document.getElementById('destAirport').textContent=elem.name;
                        getApproachingAirportData(elem.href);
                    })
                }
                
                document.getElementById('airportNames').appendChild(portName);
            })
        })
        .catch(err=>console.log(err))
    }

    const getDepartureAirportData=(url)=>{
        //trimming url to root directory
        url=url.substring(21);
        console.log(url);

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

                    //remove "elevation is" prefix
                    while (true){
                        if (parseInt(nextWord[0],10))
                            break;
                        nextWord=nextWord.substring(1);
                    }
                    document.getElementById('depElev').value=nextWord;
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
                                    document.getElementById('depATIS').value=$(elem).next().text();
                                    break;
                                case 'awos':
                                    document.getElementById('depAWOS').value=$(elem).next().text();                                    
                                    break;
                                case 'asos':
                                    document.getElementById('depASOS').value=$(elem).next().text();                                    
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
                        document.getElementById('depTower').value=$(elem).next().text();
                        break;
                    case 'departure':
                        document.getElementById('departure').value=$(elem).next().text();
                        break;
                    case 'ground':
                        document.getElementById('depGndCont').value=$(elem).next().text();
                        break;
                    case 'delivery':
                        document.getElementById('clncDeliv').value=$(elem).next().text();
                        break;
                    default:
                        break;
                }
            })
            }
        })
        .catch(err=>console.log(" FUCK YOU"))
    }
    const getApproachingAirportData=(url)=>{
        //trimming url to root directory
        url=url.substring(21);
        console.log(url);


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

                    //remove "elevation is" prefix
                    while (true){
                        if (parseInt(nextWord[0],10))
                            break;
                        nextWord=nextWord.substring(1);
                    }
                    document.getElementById('destElev').value=nextWord;
                    break;
                }
            }
            
            //get tower,ground,approach
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
                        document.getElementById('apcTower').value=$(elem).next().text();
                        break;
                    case 'approach':
                        document.getElementById('apcCont').value=$(elem).next().text();
                        break;
                    case 'ground':
                        document.getElementById('apcGndCont').value=$(elem).next().text();
                        break;
                    default:
                        break;
                }
            })
            }
        })
        .catch(e=>{console.log(e)})
    }

    //on keypress enter, form is NOT submitted and airport names are fetched
    const blockSubmitDep=(e)=>{
        e.preventDefault();
        getAirportNames(e,true);
    }
    const blockSubmitDest=(e)=>{
        e.preventDefault();
        getAirportNames(e,false);
    }


    return <div id='leftHalf'>
            <div id='forms'>
                <form id='departingForm' onSubmit={blockSubmitDep}>
                    <label htmlFor='departingAirport'>Departing Airport</label>
                    <input className='searchInput' type="text" id='departingAirport' name='departingAirport'></input>
                    <Button onClick={(e)=>{getAirportNames(e,true)}} className='searchBtn'><BsSearch/></Button>
                </form>
                <form id='approachingForm' onSubmit={blockSubmitDest}>
                    <label htmlFor='airportName'>Destination Airport</label>
                    <input className='searchInput' type="text" id='approachingAirport' name='approachingAirport'></input>
                    <Button onClick={(e)=>{getAirportNames(e,false)}} className='searchBtn'><BsSearch/></Button>
                </form>
            </div>
            <div id='suggestedNames'>
                <h3>SUGGESTED AIRPORTS</h3>
                <hr />
                <div id='airportNames'></div>
            </div>
        </div>
}

const Airports=()=>{
    
    return <React.Fragment>
        <div id='wholeScreen'>
            <BrowseAirports />
            <DataTable />
        </div>
    </React.Fragment>
    
}

export default Airports