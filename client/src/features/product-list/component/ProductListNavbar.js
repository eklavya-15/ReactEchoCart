import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  selectAllProducts,
  fetchAllProductsAsync,
} from "../productSlice.js";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link,useParams } from "react-router-dom";



export default function ProductListNavbar() {
    let {id} = useParams();
    // id = id.toLocaleUpperCase()
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
     let name = [];
     if(id === 'men')
     {name = ['mens-shirts',"mens-shoes", ' mens-watches'];}
     if(id === 'women')
     {name =['womens-dresses','womens-watches', 'womens-bags' ,'womens-jewellery','womens-shoes'];}
     if(id === 'watches')
     {name =['mens-watches'];}
     if(id === 'home-decor')
     {name =['home-decoration','fragrances','lighting'];}

  // const [filter, setFilter] = useState({});
//   const [sort, setSort] = useState({});

  // const handleFilter = () => {
  //   // console.log(e,section.id,option.value);
  //   const newFilter = { 'category' :[] };
  //    if(id === 'men')
  //       newFilter['category'].push('mens-shirts');
  //    if(id === 'women')
  //       newFilter['category'].push('womens-dresses');
  //    if(id === 'watches')
  //       newFilter['category'].push('mens-watches');
  //    if(id === 'home-decor')
  //       newFilter['category'].push('home-decoration');

  //   setFilter(newFilter);

    
  // };
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    console.log("you know me");
  }, [dispatch]);

  return (
    <>
    <div className="bg-[#fff] ">
      <div>
      

        <main className=" ">
          <div className="flex items-baseline justify-between border-b border-t border-gray-900 pb-6 pt-4 bg-[#fffdd7]">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-Raleway pl-4">
              {id.toLocaleUpperCase()}'s Category
            </h1>

        
           
          </div>

          <section aria-labelledby="products-heading" className=" ">
           

            <div className="grid  gap-x-8 gap-y-10 md:grid-cols-5 sm:grid-cols-3  ">
          

              {/* Product grid */}
              <div className="md:col-span-5 sm:col-span-3 ">
                <div>
                  <div className="bg-[#FFF]">
                    <div className="px-4 py-0 sm:px-6 sm:py-0 md:px-8 ">
                      <div className="mt-6 grid grid-cols-1 md:gap-x-16 sm:gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-3 xl:gap-x-8 py-10 px-10 ">
                        {products &&
                          products.map((product) => (
                            // (product.category === name
                            (name.includes(product.category)
                            ?
                            (<div
                              key={product.id}
                              className="group relative border-solid border bg-[#FFFDD7] hover:border-green-700  border-gray-900 p-2 "
                            >
                              <Link to={`/product-detail/${product.id}`}>
                                <div class="text-xs font-semibold text-black bg-yellow-300 bg-opacity-75 absolute top-0 right-0 w-3/10 px-2 py-1 z-10"> {Math.floor(product.discountPercentage)}% OFF
                                </div>{" "}
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 md:aspect-none    sm:h-60">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center  md:h-full md:w-full   hover:scale-250 transition-transform group-hover:scale-125 group-hover:-z-10 duration-100"
                                  />
                                </div>
                                <div className="mt-4 flex justify-between">
                                  <div>
                                    <h3 className="text-sm text-black font-sans">
                                      <div href={product.href}>
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0"
                                        />
                                        {product.title}
                                      </div>
                                    </h3>
                                    <p className=" text-sm text-gray-500">
                                      <StarIcon className="w-5 h-5 inline text-green-600 mr-1">
                                        {" "}
                                      </StarIcon>
                                      <span className="align-bottom">
                                        {product.rating}
                                      </span>
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      $
                                      {Math.round(
                                        product.price *
                                          (1 - product.discountPercentage / 100)
                                      )}
                                    </p>
                                    <p className="text-sm font-medium line-through text-gray-400 ">
                                      ${product.price}
                                    </p>
                                  </div>
                                </div>
                                {product.deleted && (
                                  <div>
                                    <p className="text-sm text-red-400">
                                      product deleted
                                    </p>
                                  </div>
                                )}
                                {product.stock <= 0 && (
                                  <div>
                                    <p className="text-sm text-red-400">
                                      out of stock
                                    </p>
                                  </div>
                                )}
                              </Link>
                            </div>)
                            :null)
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    </>
  )
}
