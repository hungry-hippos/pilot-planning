(this["webpackJsonppilot-planning"]=this["webpackJsonppilot-planning"]||[]).push([[0],{160:function(e,t,n){},162:function(e,t,n){},164:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(76),s=n.n(a),i=n(20),d=n.n(i),l=n(21),o=n.n(l),j=n(34),h=n(14),u=(n(160),n(0)),p=function(){return Object(c.useEffect)((function(){for(var e=document.getElementsByClassName("rhInput"),t=0;t<e.length;t++)e[t].disabled=!0})),Object(u.jsxs)("div",{id:"rightHalf",children:[Object(u.jsx)("h3",{children:"DEPARTING"}),Object(u.jsx)("h4",{id:"depAirport",children:"Please search and select an airport."}),Object(u.jsx)("hr",{}),Object(u.jsx)("table",{id:"departingTable",children:Object(u.jsxs)("tbody",{children:[Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Dep. Elevation"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"depElev",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Clearance Delivery"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"clncDeliv",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Dep. Ground Control"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"depGndCont",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Dep. Tower"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"depTower",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"ATIS"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"depATIS",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"ASOS"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"depASOS",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"AWOS"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"depAWOS",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Dep. Frequencies"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"departure",className:"rhInput"})})]})]})}),Object(u.jsx)("h3",{children:"DESTINATION"}),Object(u.jsx)("h4",{id:"destAirport",children:"Please search and select an airport."}),Object(u.jsx)("hr",{}),Object(u.jsx)("table",{id:"approachingTable",children:Object(u.jsxs)("tbody",{children:[Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Dest. Elevation"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"destElev",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Apc. Control"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"apcCont",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Apc. Tower"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"apcTower",className:"rhInput"})})]}),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:"Apc. Ground Control"}),Object(u.jsx)("td",{children:Object(u.jsx)("input",{id:"apcGndCont",className:"rhInput"})})]})]})}),Object(u.jsx)(h.a,{variant:"primary",className:"rhBtn",children:"SAVE AND CONTINUE"}),Object(u.jsx)(h.a,{variant:"primary",onClick:function(){for(var e=document.getElementsByClassName("rhInput"),t=0;t<e.length;t++)e[t].disabled=!1},className:"rhBtn",children:"EDIT"})]})},x=function(){var e=function(e,c){e.preventDefault(),document.getElementById("airportNames").textContent="";for(var r=c?document.getElementById("departingAirport").value:document.getElementById("approachingAirport").value,a="https://skyvector.com/search/site/search/site/",s=0;s<r.length;s++)" "!==r[s]?a+=r[s]:a+="%2520";console.log(a),d.a.get(a).then((function(e){var t=o.a.load(e.data),n=[];return t(".search-results").find("a").each((function(e){n[e]={name:t(this).text(),href:t(this).attr("href")}})),n})).then((function(e){e.forEach((function(e){var r=document.createElement("div");r.setAttribute("href",e.href),r.classList.add("availableAirport"),r.textContent=e.name,c?r.addEventListener("click",(function(){document.getElementById("depAirport").textContent=e.name,t(e.href)})):r.addEventListener("click",(function(){document.getElementById("destAirport").textContent=e.name,n(e.href)})),document.getElementById("airportNames").appendChild(r)}))})).catch((function(e){return console.log(e)}))},t=function(e){e=e.substring(23),console.log(e),d.a.get(e).then((function(e){var t=o.a.load(e.data);if(t("#aptcomms").text()){for(var n=t(".aptdata").text().toLowerCase(),c=t("th"),r=0;r<n.length;r++){for(var a="";" "!==n[r];)a+=n[r],r++;if("elevation"===a){for(;"l"!==n[r];)a+=n[r],r++;for(a+="l";!parseInt(a[0],10);)a=a.substring(1);document.getElementById("depElev").value=a;break}}c.each((function(e,n){for(var c=t(n).text().toLowerCase(),r="",a=c.length-1;a>-1&&" "!==c[a];a--)r=c[a]+r;for(var s=0;s<r.length;s++)if("a"===r[s])for(var i="";s<r.length;)switch(i+=r[s],s++,i){case"atis":document.getElementById("depATIS").value=t(n).next().text();break;case"awos":document.getElementById("depAWOS").value=t(n).next().text();break;case"asos":document.getElementById("depASOS").value=t(n).next().text()}})),c.each((function(e,n){for(var c=t(n).text().toLowerCase(),r="",a=c.length-2;a>-1&&" "!==c[a];a--)r=c[a]+r;switch(r){case"tower":document.getElementById("depTower").value=t(n).next().text();break;case"departure":document.getElementById("departure").value=t(n).next().text();break;case"ground":document.getElementById("depGndCont").value=t(n).next().text();break;case"delivery":document.getElementById("clncDeliv").value=t(n).next().text()}}))}else document.getElementById("airportData").textContent="NOTHING FOUND, FUCK YOU ~~C===3"})).catch((function(e){return console.log(" FUCK YOU")}))},n=function(e){e=e.substring(23),console.log(e),d.a.get(e).then((function(e){var t=o.a.load(e.data);if(t("#aptcomms").text()){for(var n=t(".aptdata").text().toLowerCase(),c=t("th"),r=0;r<n.length;r++){for(var a="";" "!==n[r];)a+=n[r],r++;if("elevation"===a){for(;"l"!==n[r];)a+=n[r],r++;for(a+="l";!parseInt(a[0],10);)a=a.substring(1);document.getElementById("destElev").value=a;break}}c.each((function(e,n){for(var c=t(n).text().toLowerCase(),r="",a=c.length-2;a>-1&&" "!==c[a];a--)r=c[a]+r;switch(r){case"tower":document.getElementById("apcTower").value=t(n).next().text();break;case"approach":document.getElementById("apcCont").value=t(n).next().text();break;case"ground":document.getElementById("apcGndCont").value=t(n).next().text()}}))}else document.getElementById("airportData").textContent="NOTHING FOUND, FUCK YOU ~~C===3"})).catch((function(e){console.log(e)}))};return Object(u.jsxs)("div",{id:"leftHalf",children:[Object(u.jsxs)("div",{id:"forms",children:[Object(u.jsxs)("form",{id:"departingForm",onSubmit:function(t){t.preventDefault(),e(t,!0)},children:[Object(u.jsx)("label",{htmlFor:"departingAirport",children:"Departing Airport"}),Object(u.jsx)("input",{className:"searchInput",type:"text",id:"departingAirport",name:"departingAirport"}),Object(u.jsx)(h.a,{onClick:function(t){e(t,!0)},className:"searchBtn",children:Object(u.jsx)(j.a,{})})]}),Object(u.jsxs)("form",{id:"approachingForm",onSubmit:function(t){t.preventDefault(),e(t,!1)},children:[Object(u.jsx)("label",{htmlFor:"airportName",children:"Destination Airport"}),Object(u.jsx)("input",{className:"searchInput",type:"text",id:"approachingAirport",name:"approachingAirport"}),Object(u.jsx)(h.a,{onClick:function(t){e(t,!1)},className:"searchBtn",children:Object(u.jsx)(j.a,{})})]})]}),Object(u.jsxs)("div",{id:"suggestedNames",children:[Object(u.jsx)("h3",{children:"SUGGESTED AIRPORTS"}),Object(u.jsx)("hr",{}),Object(u.jsx)("div",{id:"airportNames"})]})]})},b=function(){return Object(u.jsx)(r.a.Fragment,{children:Object(u.jsxs)("div",{id:"wholeScreen",children:[Object(u.jsx)(x,{}),Object(u.jsx)(p,{})]})})};n(162),n(163);var O=function(){return Object(u.jsx)(r.a.Fragment,{children:Object(u.jsx)(b,{})})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,165)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};s.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(O,{})}),document.getElementById("root")),m()}},[[164,1,2]]]);
//# sourceMappingURL=main.a629457b.chunk.js.map