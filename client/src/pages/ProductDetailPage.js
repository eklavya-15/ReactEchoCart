import React from 'react'
import ProductDetail from '../features/product-list/ProductDetail'
import Navbar from '../features/navbar/Navbar'
import Navbar2 from '../features/navbar/Navbar2'
import Popup from '../features/Popup/Popup'
import AOS from "aos";


export default function ProductDetailPage() {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div>
      <Navbar2></Navbar2>
      <ProductDetail handleOrderPopup={handleOrderPopup}></ProductDetail>
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />


    </div>
  )
}
