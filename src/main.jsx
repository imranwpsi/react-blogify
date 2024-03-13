import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx'
import ProfileProvider from './providers/ProfileProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
      <Router>
        <App />
      </Router>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>,
)
