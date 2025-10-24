import { useEffect, useState } from 'react';
import './../Modal.css'

function Modal({ open, defaultOpen = false, onClose,title,children }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const OpenCondition = open !== undefined ? open : isOpen;

    const modalDisplayStyle = {
        display: OpenCondition ? "block" : "none",
    }

 


    const hanldeClose  = () => {
        if(open !== undefined ){
            onClose?.(false);
            console.log("if exicuted")
        }
        else {
            setIsOpen(false);
        onClose?.(false)
        console.log("else exicuted")
        }
    }


    useEffect(() => {
        const callBack = (e) => {
            console.log(e)
            if(e.code === 'Escape'){
                hanldeClose();
            }
        }
        document.addEventListener('keydown',callBack);

        return () => {
            console.log("hello")
            document.removeEventListener("keydown",callBack);
        }
    },[hanldeClose])


    return (

        <>
            {/* <button  className="" style={modalDisplayStyle} onClick={handleModalOpen}>Open Modal</button> */}
            <div id="id01" className="w3-modal" style={modalDisplayStyle}>
                <div className="w3-modal-content">
                    <header className="w3-container w3-teal">
                        <span 
                            className="w3-button w3-display-topright" onClick={hanldeClose}>&times;</span>
                        <h2>{title}</h2>
                    </header>
                    
                    <div className="w3-container">
                       {children}
                    </div>

                    <footer className="w3-container w3-teal">
                        <p>Modal Footer</p>
                    </footer>
                </div>
            </div>
        </>
    )
}



export default Modal


// 🧪 Step 1: Make a “stale closure” scenario

// Change your App.jsx like this:

// function App() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [counter, setCounter] = useState(0);

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     console.log("Modal closed, counter =", counter);
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <button onClick={handleOpen}>Open</button>
//       <button onClick={() => setCounter(c => c + 1)}>Increase Counter</button>
//       <p>Counter: {counter}</p>

//       <Modal title="Controlled Modal" open={isOpen} onClose={handleClose}>
//         <p>Press ESC to close this modal.</p>
//       </Modal>
//     </>
//   );
// }

// 🧪 Step 2: In your Modal.jsx, remove [handleClose]
// useEffect(() => {
//   const callback = (e) => {
//     if (e.code === "Escape") handleClose();
//   };
//   document.addEventListener("keydown", callback);
//   return () => document.removeEventListener("keydown", callback);
// }, []); // ❌ no [handleClose]

// 🧪 Step 3: Test it

// Open modal.

// Click Increase Counter a few times (so counter changes).

// Press Escape to close modal.

// 👉 What you’ll see in console:

// Modal closed, counter = 0


// Even if your counter is 5, 10, etc… it still logs 0.
// That’s because the effect is using the first version of handleClose (stale closure bug).

// ✅ Step 4: Fix with [handleClose]

// Now change to:

// }, [handleClose]); // ✅


// Repeat the same test → this time you’ll see the latest counter value logged. 🎉

// So that’s how you prove to yourself why [handleClose] is needed.

// Do you want me to also show you how to avoid re-renders by combining [handleClose] with useCallback? That’s the next optimization step.