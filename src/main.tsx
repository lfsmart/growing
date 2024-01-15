import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
ReactDOM.createRoot(document.getElementById('root')!, { 
  identifierPrefix: 'react-',
  onRecoverableError(...args){
    console.log( args )
  }
}).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
