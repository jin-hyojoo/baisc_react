import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App1 from './App1';
//import Sample from './Sample';
import UseData from './UseData';
import ObjectTest1 from './ObjectTest1';


import reportWebVitals from './reportWebVitals';

/*
function Nav(){
  return(
    <h1>Nav</h1>
  );
}*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App1 />
    <hr></hr>
    <UseData />
    <hr></hr>
    <ObjectTest1 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
