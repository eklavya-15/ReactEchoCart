import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectOrders } from "../userSlice";
import { selectUserInfo } from "../userSlice";
export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <div>
      {orders &&
        orders.map((order) => (
          <>
            <div className="">
              <div className="max-w-4xl px-4 sm:px-6 lg:px-8 bg-white my-5 mx-auto ">
                <div className="">
                  <div className="flow-root">
                    <h1 className="text-3xl font-bold tracking-tight my-6 text-gray-900">
                      Order #{order.id}
                    </h1>
                    <h3 className="text-3xl font-bold tracking-tight my-6 text-gray-900">
                      Order Status : {order.status}
                    </h3>
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.items &&
                        order.items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <p className="capitalize">
                                      {item.product.title}
                                    </p>
                                  </h3>
                                  <p className="ml-4">
                                    $
                                    {Math.floor(
                                      item.product.price *
                                        (1 - item.product.discountPercentage / 100)
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="block text-sm inline mr-6 font-medium leading-6 text-gray-900"
                                  >
                                    Qty: {item.quantity}
                                  </label>
                                </div>
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
                    <p>${order.subtotal}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items in Cart</p>
                    <p>{order.totalItems} items</p>
                  </div>

                  <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order.selectedAddress[0].name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAddress[0].street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAddress[0].pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {order.selectedAddress[0].phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {order.selectedAddress[0].city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
