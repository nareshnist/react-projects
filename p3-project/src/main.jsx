import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';

import Accordian from './exercise/Accordian.jsx';
import Calculator from './exercise/Calculator.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />


    
    {/* <FlashCards />
    <Counter /> */}

    <Accordian />
    <Calculator />

  </StrictMode>,
)
