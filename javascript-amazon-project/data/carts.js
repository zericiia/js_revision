export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 6,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function DeleteFromCart(productIdToRemove) {
  const index = cart.findIndex(
    (cartItem) => cartItem.productId === productIdToRemove
  );

  // If the item exists, remove it
  if (index !== -1) {
    cart.splice(index, 1);
  }
  saveToStorage();
  let cartItemNumber = document.querySelector(".js-checkout");
  updateCartQunatity(cartItemNumber);
}
export function calculateCartQuantity() {
  let cartItemsQuantity = 0;
  cart.forEach((cartItem) => {
    cartItemsQuantity += cartItem.quantity;
  });
  return cartItemsQuantity;
}
export function updateCartQunatity(element = "", extraHtml = "") {
  element.innerHTML = calculateCartQuantity() + extraHtml;
}
