import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { IoIosContact } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoReorderFour } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo-no-background.png";
import { GiFlowerPot } from "react-icons/gi";
import { GiWatch } from "react-icons/gi";
import { IoWomanSharp } from "react-icons/io5";
import { IoManSharp } from "react-icons/io5";
import { selectItems } from "../Cart/cartSlice";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon, } from "@heroicons/react/24/outline";
import { selectLoggedInUser } from "../auth/authSlice";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const user = {
  name: "Eklavya Lalwani",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Men", link: "/navbar/men", current: true },
  { name: "Woman", link: "/navbar/women", current: true },
  { name: "Watches", link: "/navbar/watches", current: true },
  { name: "Home Decor", link: "/navbar/home-decor", current: true },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];
export default function Navbar2() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectLoggedInUser)
  console.log(isLoggedIn)
  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <>
      <Disclosure as="nav" >
        {({ open }) => (
          // <nav className=" ">
          <div >
            <div className=" flex flex-wrap items-center justify-between mx-auto p-4 bg-[#111827] text-white  z-20 top-0 start-0 border-b border-gray-200">
              <Link
                to="/"
                className="flex flex-row items-center justify-center space-x-3 rtl:space-x-reverse"
              >
                <img className="h-6 w-25 " src={logo} alt="Your Company" />
              </Link>
              <div className="sm:flex sm:flex-row  hidden text-xl items-center justify-center gap-2  md:order-2  rtl:space-x-reverse ">
                <div className="ml-4 flex items-center md:ml-6">
                  <Link to="/cart">
                    <HiOutlineShoppingCart
                      className="h-6 w-6 cursor-pointer text-green-600 mr-2"
                      aria-hidden="true"
                    />
                  </Link>
                  {items.length > 0 && (
                    <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 z-10">
                      {items.length}
                    </span>
                  )}
                </div>
                <div className="text-green-600">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ">
                    <div>
                      <Menu.Button className="relative flex max-w-xs items-center rounded-full  text-sm ">
                        <IoIosContact className="h-6 w-6" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            <Link
                              to={item.link}
                              className="bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                            >
                              {item.name}
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div>
                  {!isLoggedIn ? (
                    <Link to="/login">
                      <button className="bg-green-600 hover:scale-105 duration-200  text-white py-1 px-2 rounded-lg flex items-center gap-1 ml-3">
                        <IoLogIn />
                        <div className="text-md">Sign In</div>
                      </button>
                    </Link>
                  ) : (
                    <Link to="/logout">
                      <button className="bg-green-600 hover:scale-105 duration-200  text-white py-1 px-2 rounded-lg flex items-center gap-1 ml-3">
                        <div className="text-md">Sign out</div>
                        <IoLogOutOutline />
                      </button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  {isOpen ? (
                    <XMarkIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                      onClick={handleClick}
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                      onClick={handleClick}
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div
                className={`items-center justify-between  w-full md:flex md:w-auto md:order-1  hidden`}
                id="navbar-sticky"
              >
                <ul className=" text-white flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[#111827] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#111827] ">
                  <li className="flex flex-row items-center justify-center text-white md:hover:text-green-500">
                    <IoManSharp  />
                    <Link
                      to="/navbar/men"
                      className="block py-2 px-3 text-white md:hover:text-green-500 bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-blue-500 ml-2"
                      aria-current="page"
                    >
                      MEN
                    </Link>
                  </li>
                  <li className="flex flex-row items-center justify-center md:hover:text-green-500">
                    <IoWomanSharp />{" "}
                    <Link
                      to="/navbar/women"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:text-green-500 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ml-2"
                    >
                      WOMEN
                    </Link>
                  </li>
                  <li className="flex flex-row items-center justify-center md:hover:text-green-500">
                    <GiWatch />
                    <Link
                      to="/navbar/watches"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:hover:text-green-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ml-1"
                    >
                      WATCHES
                    </Link>
                  </li>
                  <li className="flex flex-row items-center justify-center md:hover:text-green-500">
                    <GiFlowerPot />
                    <Link
                      to="/navbar/home-decor"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ml-1"
                    >
                      HOME DECOR
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden ">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    <Link to={item.link}>{item.name}</Link>
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <Link to="/cart">
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </button>
                  {items.length > 0 && (
                    <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {items.length}
                    </span>
                  )}
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <Link to={item.link}>
                      {item.name}
                      </Link>
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
            </div>
          // </nav>
        )}
      </Disclosure>
    </>
  );
}
