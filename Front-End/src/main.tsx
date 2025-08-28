import React from 'react'
import ReactDom from 'react-dom/client'
import Router from './router.tsx'
import './index.css'

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
