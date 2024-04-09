import NavBar from "../features/navbar/Navbar";
import Navbar2 from "../features/navbar/Navbar2";
import UserOrders from "../features/User/components/UserOrders";
import Footer from "../features/Footer/Footer";
function UserOrdersPage() {
  return (
    <div>
      <Navbar2></Navbar2>
      <UserOrders></UserOrders>
      <Footer></Footer>
    </div>
  );
}
export default UserOrdersPage;
