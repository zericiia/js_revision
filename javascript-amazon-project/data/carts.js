export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 6,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function AddToCart(productId, selectorValue) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += selectorValue;
  } else {
    cart.push({
      productId: productId,
      quantity: selectorValue,
    });
  }
}

export function DeleteFromCart(productIdToRemove) {
  const index = cart.findIndex(
    (cartItem) => cartItem.productId === productIdToRemove
  );

  // If the item exists, remove it
  if (index !== -1) {
    cart.splice(index, 1);
  }
}
