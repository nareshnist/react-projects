import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import StarRating from './StarRating.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <StarRating maxRating={5}  className='test' messages={['Terrible','Bad','Okay','Good','Amazing']} defaultRating={3} onSetRating={() => {}} /> */}
  </StrictMode>,
)
