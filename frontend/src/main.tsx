import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { Toaster } from "react-hot-toast";
import { EventProvider } from './context/eventContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <App />
      </EventProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  </StrictMode>,
)
