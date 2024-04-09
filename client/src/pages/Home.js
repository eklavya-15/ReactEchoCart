import React from "react";
import ProductList from "../features/product-list/component/ProductList";
import Footer from "../features/Footer/Footer";
import Hero from "../features/Hero/Hero";
import Navbar2 from "../features/navbar/Navbar2";
import Banner from "../features/Banner/Banner";

export default function Home() {
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <Navbar2></Navbar2>
      <Hero></Hero>
      <Banner></Banner>
      <ProductList></ProductList>
      <Footer></Footer>
    </div>
  );
}
