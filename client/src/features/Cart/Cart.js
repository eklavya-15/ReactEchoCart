import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {  selectItems,updateCartAsync,deleteItemFromCartAsync,fetchsCartItemByUserIdAsync,selectCartLoaded } from "./cartSlice";
import { Link,Navigate } from "react-router-dom";


export default function Cart() {
  const dispatch = useDispatch()
  const products = useSelector(selectItems)
  const cartLoaded = useSelector(selectCartLoaded)

  const handleQuantity = (e, item) => {
     dispatch(updateCartAsync({id:item.id, quantity: +e.target.value}))
  }
  const handleRemoveClick = (e, itemId) => {
     dispatch(deleteItemFromCartAsync(itemId));
  }
 
  
  let subtotal = 0;
  // const totalMoneySaved = products.reduce((total,item)=>Math.floor((item.product?.price)*(item.product?.discountPercentage/100)*(item.quantity)) + total,0)
  
  let totalMoneySaved = 0;

if (Array.isArray(products)) {
  products.forEach((item) => {
    if (item.product && item.product.price && item.product.discountPercentage && item.quantity) {
      const discountedPrice = Math.floor((item.product.price) * (item.product.discountPercentage / 100) * (item.quantity));
      totalMoneySaved += discountedPrice;
    }
  });
}
  
  return (
    <>
    {!products.length && cartLoaded && <Navigate to="/" replace={true}></Navigate>}
    <div className="">
      <div className="max-w-4xl px-4 sm:px-6 lg:px-8 bg-white my-5 mx-auto ">
        <div className="">
          <div className="flow-root">
            <h1 className="text-3xl font-bold font-sans tracking-tight my-6 text-gray-900">
              Cart
            </h1>
            <ul role="list" className="-my-6 divide-y divide-gray-500">
              {products && Array.isArray(products) && products.map((item) => (
                <li key={item.product?.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product?.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <p className="capitalize">{item.product?.title}</p>
                        </h3>
                        <p className="ml-4">
                          ${Math.floor((item.product?.price)*(1-(item.product?.discountPercentage/100)))}
                          <span className="hidden" aria-hidden="true">{subtotal += (Math.floor((item.product?.price)*(1-(item.product?.discountPercentage/100))*(item.quantity)))}</span>
                          </p>
                      </div>
                      <p className="flex flex-row-reverse text-sm text-gray-500 ml-4 decoration-2">
                        Money Saved: ${Math.floor((item.product?.price)*(item.product?.discountPercentage/100))}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className=" text-sm inline mr-6 font-medium leading-6 text-gray-900"
                        >
                          Qty: {item.quantity}
                        </label>
                        <select value={item.quantity} onChange={e=>handleQuantity(e,item)} className="px-2 py-1 border border-gray-900">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          onClick={e=>handleRemoveClick(e,item.id)}
                          type="button"
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="  py-6 ">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex justify-between ">
          <p className="mt-0.5 text-sm text-green-600">
          Total Money Saved
          </p>
          <p className="text-green-600">
          🤑🤑${totalMoneySaved}
          </p>
          </div>
          <div className="mt-6">
            <Link 
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
            >
              Checkout
            </Link>
          </div> 
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
              <button
                type="button"
                className="font-medium text-green-600 hover:text-green-500 pl-1"
                
              >
                Continue Shopping
        
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
