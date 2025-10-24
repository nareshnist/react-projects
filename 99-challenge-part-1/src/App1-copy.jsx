import { useState } from 'react';
import Modal from './reusesable-components/Modal';
import UseEffectDepth from './UseEffectDepth'
import UseRefDepth from './UseRefDepth'
import './App.css'

function App() {

  // Modal JSX

  // const [count, setCount] = useState(0)
  // const [isOpen, setIsOpen] = useState(false)

  // const handleOpen = () => {
  //   setIsOpen(true);
  //   console.log("logged")
  // }

  // const handleClose = () => {
  //   setIsOpen(false);
  //   console.log("Modal closed, counter =", count);

  // }

  return (
    <>

    {/* <UseEffectDepth /> */}
    <UseRefDepth />

    {/* Modal jsx  */}
      
      {/* <button onClick={() => setCount(c => c + 1)}>Increase Counter</button>
      <p>Counter: {count}</p>
      <button type='button' className='w3-button w3-black' onClick={handleOpen} >Open</button>
      <Modal title='Controlled Modal' open={isOpen} onClose={handleClose} > 
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, ad?</p>
      </Modal> */}

    </>
  )
}

export default App
