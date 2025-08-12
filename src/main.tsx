import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <App />
  </StrictMode>,
)
