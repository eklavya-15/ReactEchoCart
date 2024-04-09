import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  selectAllProducts,
  fetchProductsByFiltersAsync,
  selectTotalItems,
  selectBrands,
  selectCategories,
  fetchBrandsAsync,
  fetchCategoriesAsync,
} from "../productSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

export default function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const handleFilter = (e, section, option) => {
    // console.log(e,section.id,option.value);
    const newFilter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
    console.log(filter);
  };

  const handleSort = (e, option) => {
    // console.log(e,option);
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };
  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);
  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const filters = [
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
    {
      id: "category",
      name: "Category",
      options: categories,
    },
  ];

  return (
    <div className="bg-[#fff] ">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-[#fff] py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-[#fff] p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters &&
                      filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex flex-row w-full items-center justify-between bg-[#fff] px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options &&
                                    section.options.map((option, optionIdx) => (
                                      <div
                                        key={option.value}
                                        className="flex items-center"
                                      >
                                        <input
                                          id={`filter-mobile-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          defaultValue={option.value}
                                          type="checkbox"
                                          onChange={(e) =>
                                            handleFilter(e, section, option)
                                          }
                                          defaultChecked={option.checked}
                                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label
                                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                          className="ml-3 min-w-0 flex-1 text-gray-500"
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className=" ">
          <div className="flex items-baseline justify-between border-b border-t border-gray-900 pb-6 pt-4 bg-[#fffdd7]">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-Raleway pl-4">
              All Products
            </h1>
            <div className="flex items-center max-w-full overflow-hidden">
              {/* <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-4 sm:mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-[#fff] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions &&
                        sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={(e) => handleSort(e, option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> */}

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:mx-3"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 mx-1 p-2 text-gray-400 hover:text-gray-500 sm:-ml-1 sm:mr-1 md:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className=" ">
            <h2 id="products-heading" className="sr-only border-r border-gray-900">
              Products
            </h2>

            <div className="grid  gap-x-8 gap-y-10 md:grid-cols-5 sm:grid-cols-3  ">
              {/* Filters */}
              <form className="hidden md:block  border-r border-gray-900  bg-[#fffdd7] ">
                {/* <hr className="border-gray-900"></hr> */}
                {filters &&
                  filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-900 hover:border-black hover:border px-2 py-4"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root ">
                            <Disclosure.Button className="flex w-full items-center justify-between  py-3 text-sm bg-[#fffdd7] text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900 pl-3">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options &&
                                section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleFilter(e, section, option)
                                      }
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
              </form>

              {/* Product grid */}
              <div className="md:col-span-4 sm:col-span-3">
                <div>
                  <div className="bg-[#FFF] ">
                    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 md:max-w-7xl md:px-8 ">
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-3 xl:gap-x-8 py-10">
                        {products &&
                          products.map((product) => (
                            <div
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
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Pagination
            handlePage={handlePage}
            page={page}
            totalItems={totalItems}
          ></Pagination>
        </main>
      </div>
    </div>
  );
}

function Pagination({ page, setPage, handlePage, totalItems = 100 }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-900 bg-[#fffdd7] px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}{" "}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div className="">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm "
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2  ring-1 ring-inset ring-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-100 inline-flex     items-center ${
                  index + 1 === page
                    ? "bg-green-600 text-black border border-gray-900 "
                    : "text-gray-500 bg-white border-b border-t border-gray-900"
                } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(totalPages > page ? page + 1 : page)}
              className="relative inline-flex cursor-pointer items-center  rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
