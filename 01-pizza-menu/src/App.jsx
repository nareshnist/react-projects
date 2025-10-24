import { cloneElement } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className='container'>
      <Header></Header>
      <Menu></Menu>
      <Footer></Footer>
    </div>
  )
}


// Props destructuring ..........
function Pizza({ pizzaObj }) {

  // if (pizzaObj.soldOut) return

  console.log(pizzaObj)
  return (
    // condinally adding the class
    <li className={`pizza ${pizzaObj.soldOut ? 'sold-out':''}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>

        {/*  condinally return the html  */}
        <span> {pizzaObj.soldOut ? <span>SOLD OUT</span> :pizzaObj.price}</span>
      </div>
    </li>
  )
}


function Header() {
  const style = {}
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  let pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
  ];

  // pizzaData = []

  return (
    <main className='menu'>
      <h2>Our menu</h2>

      { /* <Pizza name='' photoName='' /> */}

      {/* with && Operator */}
      {/* {
        pizzaData.length > 0 && (
          <ul className='pizzas'>
  

            {
              pizzaData.map((pizza) => <Pizza key={pizza.name} pizzaObj={pizza} />)
            }
          </ul>
        )
      } */}

      {/* with ternariy operator */}

      {
        pizzaData.length > 0 ? (
          <ul className='pizzas'>


            {
              pizzaData.map((pizza) => <Pizza key={pizza.name} pizzaObj={pizza} />)
            }
          </ul>
        ) : <p>We're still working on our menu. Please come back later :)</p>
      }

    </main>
  )
}

function Footer() {

  const hour = new Date().getHours();
  console.log(hour);
  console.log(hour);

  const openHour = 13;
  const closeHour = 22;

  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {
        isOpen ? (
          <Order openHou={closeHour} closeHour={closeHour} />
        ) : <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      }
    </footer>
  )
}

function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  )
}



/**
 * 
 *  Rules for creating the component
 * 
 *  - Must start with capital letter
 *  - Must return the component
 * 
 */



/**
 * 
 *  Rules Conditional rendering
 * 
 *  - && operator short circuting
 *  - ternari operator because which produce the value whereas if/elese not produce any value
 *  - multiple return 
 * 
 */

export default App
