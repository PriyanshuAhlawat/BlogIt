import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// render the main component of the application, wrapped with <React.StrictMode> and <BrowserRouter>
// <React.StrictMode> is a development-only component that helps find potential problems in an application
// <BrowserRouter> handles client-side routing
// renders the component to the DOM element with id "root"
ReactDOM.render(
  <React.StrictMode> 
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

//call the helper function for measuring web vitals metrics
reportWebVitals();

//Priyanshu CvE@iyey7jeEuXw mongodb


