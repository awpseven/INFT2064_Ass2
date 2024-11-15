import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import reportWebVitals from './reportWebVitals'
import Routes from './routes'
import AuthProvider from './utils/auth'
import { APIProvider } from '@vis.gl/react-google-maps'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <APIProvider
        apiKey={'AIzaSyAnQR_NvQRceJ4gWfcf503f6bCJqfgZc2c'}
        onLoad={() => console.log('Maps API has loaded.')}
      >
        <Routes />
      </APIProvider>

      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
