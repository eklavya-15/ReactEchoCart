import React,{useState} from 'react'
import ProductListNavbar from '../features/product-list/component/ProductListNavbar'
import Navbar2 from '../features/navbar/Navbar2'
import Footer from '../features/Footer/Footer'
export default function NavbarCateogryPage() {
  // const [category, setCategory] = useState('');
  
  // const handleCateoryChange = (data) => {
  //   setCategory(data);
  // };
  return (
    <div>
      <Navbar2 />
      <ProductListNavbar />
      <Footer />
    </div>
  )
}
