import NavBar from "../features/navbar/Navbar";
import UserOrders from "../features/User/components/UserOrders";
function UserOrdersPage() {
  return (
    <div>
      <NavBar>
        <UserOrders></UserOrders>
      </NavBar>
    </div>
  );
}
export default UserOrdersPage;
