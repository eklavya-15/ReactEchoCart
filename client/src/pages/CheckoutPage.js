import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import {
  selectItems,
  updateCartAsync,
  deleteItemFromCartAsync,
} from "../features/Cart/cartSlice";
import { Link, Navigate } from "react-router-dom";
import { selectUserInfo } from "../features/User/userSlice"; 
import {updateUserAsync} from '../features/User/userSlice'
import { createOrderAsync, selectCurrentOrder } from "../features/Order/orderSlice";
import Navbar2 from "../features/navbar/Navbar2";

export default function CheckoutPage() {
  const [open, setOpen] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const dispatch = useDispatch();
  const {register, handleSubmit,reset,formState: { errors }, } = useForm();
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder)
 
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };
  const handleRemoveClick = (e, itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  const handleAddress = (e) => {
    // console.log(e.target.value);
    setSelectedAddress(userInfo.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    // console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };
  const totalItems = items?.reduce((total, item) => item.quantity + total, 0);
  
  const subtotal = items?.reduce((total,item)=>Math.floor((Math.floor((item.product.price)*(1-(item.product.discountPercentage/100))*(item.quantity)))) + total,0)

  const totalMoneySaved = items.reduce(
    (total, item) =>
      Math.floor(
        item.product.price * (item.product.discountPercentage / 100) * item.quantity
      ) + total,
    0
  );
 
  
  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        user:userInfo.id,
        items,
        subtotal:+subtotal,
        totalItems:totalItems,
        paymentMethod,
        selectedAddress,
        status:"pending"
      };
      console.log(order);
      dispatch(createOrderAsync(order));
    } else {
      alert('Enter Address and Payment method')
    }
  };
  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder &&  currentOrder.paymentMethod ==='cash' && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
       {currentOrder &&  currentOrder.paymentMethod ==='card' && (
        <Navigate
          to={`/card-payment`}
          replace={true}
        ></Navigate>
      )}
      <Navbar2></Navbar2>
      {/* {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>} */}
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8  ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <form className="bg-[#fffdd7] px-5 py-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  updateUserAsync({
                     ...userInfo,
                    addresses: [...userInfo.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="">
                <div className="border-b border-gray-900/10 pb-12 font-sans">
                  <h2 className="text-3xl  leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    // onClick={e=>reset()}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className=" pb-8">
                 {userInfo.addresses && 
                 <>
                 <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p className="mb-2 text-sm leading-6 text-gray-600">
                    Choose from Existing addresses
                  </p>
                  </>}
                  <ul role="list">
                    {userInfo.addresses && userInfo.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-300"
                      >
                        <div className="flex gap-x-4">
                          <input
                            onChange={ handleAddress}
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone: {address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-md font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            onChange={handlePayment}
                            value="cash"
                            type="radio"
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            onChange={handlePayment}
                            name="payments"
                            checked={paymentMethod === "card"}
                            value="card"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="md:col-span-2 ">
            <div className="max-w-4xl px-4 sm:px-2 md:px-4 bg-[#fffdd7]  mx-auto ">
              <div className="">
                <div className="flow-root">
                  <h1 className="text-3xl font-sans tracking-tight mt-6 text-gray-900">
                    Cart
                  </h1>
                  <ul role="list" className="divide-y divide-gray-200">
                    {items &&
                      items.map((item) => (
                        <li key={item.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-sm font-medium text-gray-900">
                                <h3>
                                  <p className="capitalize">{item.product.title}</p>
                                </h3>
                                <p className="ml-4">
                                  $
                                  {Math.floor(
                                    item.product.price *
                                      (1 - item.product.discountPercentage / 100)
                                  )}
                                  {/* <span className="hidden" aria-hidden="true">
                                  {subtotal += (Math.floor((item.product.price)*(1-(item.product.discountPercentage/100))*(item.quantity)))}
                                  </span> */}
                                </p>
                              </div>
                              <p className="flex flex-row-reverse text-xs text-gray-500 mt-2 decoration-2">
                                Money Saved: $
                                {Math.floor(
                                  item.product.price *
                                    (item.product.discountPercentage / 100)
                                )}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="text-xs inline mr-2 font-medium leading-6 text-gray-900"
                                >
                                  Qty: {item.quantity}
                                </label>
                                <select
                                  value={item.quantity}
                                  onChange={(e) => handleQuantity(e, item)}
                                  className="px-2 py-1 border border-gray-900"
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>

                              <button 
                                onClick={(e) => handleRemoveClick(e, item.id)}
                                type="button"
                                className="font-medium text-xs text-red-600 hover:text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200  py-6 ">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal}</p>
                </div>
                <div className="flex justify-between ">
                  <p className="mt-0.5 text-sm text-green-500">
                    Total Money Saved
                  </p>
                  <p className="text-green-500">🤑🤑${totalMoneySaved}</p>
                </div>
                <div className="mt-6">
                  <div 
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                  >
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-green-600 hover:text-green-500 pl-1"
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
