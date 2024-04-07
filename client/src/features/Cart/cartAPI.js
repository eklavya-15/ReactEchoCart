export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart",{
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
    const response = await fetch("/cart/" + update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {'content-type': 'application/json'}
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchsCartItemByUserId(userId) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('/cart?user='+ userId ) 
    const data = await response.json()
    resolve({data})
  })
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + itemId,{
      method: 'DELETE',
      headers: {'content-type': 'application/json'}
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}
export function resetCart(id) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchsCartItemByUserId(id);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({status:'success'})
  });
}