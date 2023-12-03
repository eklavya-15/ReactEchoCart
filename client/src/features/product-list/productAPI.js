export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://react-ecommerce-website-three.vercel.app/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  let queryString = "";

  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length > 0) {
      const lastCategoryValue = categoryValue[categoryValue.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://react-ecommerce-website-three.vercel.app/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");

    resolve({ data: { products: data, totalItems: +totalItems } });
    console.log(data, totalItems);
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://react-ecommerce-website-three.vercel.app/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://react-ecommerce-website-three.vercel.app/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://react-ecommerce-website-three.vercel.app/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}
