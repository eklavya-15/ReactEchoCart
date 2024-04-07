import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { selectCurrentOrder } from "../features/Order/orderSlice";
import { useSelector } from "react-redux";

const CardPaymentForm = () => {
   const currentOrder = useSelector(selectCurrentOrder)
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    // Here you can handle form submission, such as validation or sending data to the server
    // For this example, let's just log the form data
    console.log({
      cardholderName,
      cardNumber,
      expiryDate,
      cvc,
    });
  };

  return (
    <>
      {loading == true && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Card Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="card-holder-name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Card Holder Name
            </label>
            <input
              type="text"
              id="card-holder-name"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="card-number"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="expiry-date"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry-date"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label
                htmlFor="cvc"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <Link to={`/order-success/${currentOrder.id}`}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default CardPaymentForm;
