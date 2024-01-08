import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router'; 
import '@/assets/index.css';
export function Fallback() {
  // 可以用做初始化 loading 效果
  return <p>Performing initial data load</p>;
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  // <React.StrictMode>
    <RouterProvider router={ router } fallbackElement={<Fallback />}></RouterProvider>
  // </React.StrictMode>,
)
