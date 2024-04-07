import React from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { fetchsCartItemByUserIdAsync } from "./features/Cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthAsync, selectLoggedInUser } from "./features/auth/authSlice";
import { selectUserChecked } from "./features/auth/authSlice";
import { useEffect } from "react";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import { fetchLoggedInUserInfoAsync } from "./features/User/userSlice";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./features/auth/components/Logout";
import CardPaymentForm from "./pages/CardPayment";
import NavbarCateogryPage from "./pages/NavbarCateogryPage";





const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <Protected>
        <Home></Home>
      // </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/navbar/:id",
    element: (
      // <Protected>
        <NavbarCateogryPage></NavbarCateogryPage>
      // </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/card-payment",
    element: <CardPaymentForm></CardPaymentForm>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchsCartItemByUserIdAsync(user.id));
      //we can get req.user in backend by token so no need to give in front end
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserInfoAsync());
      //we can get req.user in backend by token so no need to give in front end
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      { <RouterProvider router={router} />}
    </div>
  );
}

export default App;
