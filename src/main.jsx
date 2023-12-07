import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "@tanstack/react-router";
import { router } from "../src/root.js";
import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    
  </React.StrictMode>,
)
