
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Create Shadow Host
const HOST_ID = '__figma_react_host__'
let host = document.getElementById(HOST_ID)
if (!host) {
    host = document.createElement('div')
    host.id = HOST_ID
    // Ensure it's on top
    host.style.position = 'fixed'
    host.style.zIndex = '2147483647'
    host.style.top = '0'
    host.style.left = '0'
    document.body.appendChild(host)
}

// Create Shadow Root
// If it exists, use it (though in 'open' mode we can access it, attachShadow throws if already attached)
let shadow = host.shadowRoot
if (!shadow) {
    shadow = host.attachShadow({ mode: 'open' })
}

const root = ReactDOM.createRoot(shadow)

// Inject CSS
// We look for the global variable set by content.js
if (window.__FIGMA_UI_CSS__) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = window.__FIGMA_UI_CSS__
    shadow.appendChild(link)
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
