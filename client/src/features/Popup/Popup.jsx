import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Popup = ({ orderPopup, setOrderPopup }) => {
  return (
    <> 
      {orderPopup && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 ">
            <div className="fixed top-10 right-5  p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[250px]">
              {/* header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1>Item Added to Cart</h1>
                </div>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={() => setOrderPopup(false)}
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
