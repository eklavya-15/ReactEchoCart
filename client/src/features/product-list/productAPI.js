export async function fetchAllProducts() {
  try {
    
      const response = await fetch("/products");
      const data = await response.json();
      return { data };

  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  } 
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
    const response = await fetch("/products?" + queryString);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");

    resolve({ data: { products: data, totalItems: +totalItems } });
    // console.log(data, totalItems);
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}

//There are two ways to fetch promise and async/await we have used promise for all except fetchAllProducts
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}
