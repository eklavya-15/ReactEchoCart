import NavBar from '../features/navbar/Navbar';
import Navbar2 from '../features/navbar/Navbar2';
import UserProfile from '../features/User/components/UserProfile';
import Footer from "../features/Footer/Footer";

function UserProfilePage() {
  return (
    <div>
      <Navbar2></Navbar2>
        <UserProfile></UserProfile>
        <Footer></Footer>

    </div>
  );
}

export default UserProfilePage;