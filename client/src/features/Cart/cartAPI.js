export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://react-ecommerce-website-one.vercel.app/cart",{
      method: 'POST',
      body: JSON.stringify(item),
      headers: {'content-type': 'application/json'}
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://react-ecommerce-website-one.vercel.app/cart/" + update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {'content-type': 'application/json'}
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchsCartItemByUserId() {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('https://react-ecommerce-website-one.vercel.app/cart') 
    const data = await response.json()
    resolve({data})
  })
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://react-ecommerce-website-one.vercel.app/cart/" + itemId,{
      method: 'DELETE',
      headers: {'content-type': 'application/json'}
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}
export function resetCart() {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchsCartItemByUserId();
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({status:'success'})
  });
}