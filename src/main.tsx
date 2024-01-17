import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router, type BrowserRouterProps  } from 'react-router-dom'

const getConfirmation: BrowserRouterProps['getUserConfirmation'] = ( message, callback ) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}
function yourCallBack(msg: boolean): void {
  console.log(msg)
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Router getUserConfirmation={ getConfirmation } basename='web'>
      <App />
    </Router>
  // </React.StrictMode>,
)
