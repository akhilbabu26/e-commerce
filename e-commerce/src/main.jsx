import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './Context/CartContext'
import AuthProvider from './Context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider> 
        <CartProvider>     
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
