/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/style.css';
import { MyContextProvider } from './data/context.jsx';
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <MyContextProvider>
      <App/>
    </MyContextProvider>
  </Router>
)
