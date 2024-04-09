import React from 'react'
import Cart from '../features/Cart/Cart'
import NavBar from '../features/navbar/Navbar'
import Navbar2 from '../features/navbar/Navbar2'
import Footer from "../features/Footer/Footer";



export default function CartPage() {
  return (
    <div>
        <Navbar2></Navbar2>
        <Cart></Cart>
        <Footer></Footer>
    </div>
  )
}
