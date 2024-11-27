function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
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
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    AddToCart(productId, selectorValue = 0) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += selectorValue;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: selectorValue,
          deliveryOptionId: "1",
        });
      }
      this.saveToStorage();
    },
    DeleteFromCart(productIdToRemove) {
      const index = this.cartItems.findIndex(
        (cartItem) => cartItem.productId === productIdToRemove
      );

      // If the item exists, remove it
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
      this.saveToStorage();
      let cartItemNumber = document.querySelector(".js-checkout");
      this.updateCartQunatity(cartItemNumber);
    },
    calculateCartQuantity() {
      let cartItemsQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartItemsQuantity += cartItem.quantity;
      });
      return cartItemsQuantity;
    },
    updateCartQunatity(element = "", extraHtml = "") {
      element.innerHTML = this.calculateCartQuantity() + extraHtml;
    },
    UpdateDeliveyOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
  };
  // end
  return cart;
}
const cart = Cart("cart-oop");
const BusinessCart = Cart("cart-business");
cart.loadFromStorage();

BusinessCart.loadFromStorage();

console.log(cart);
console.log(BusinessCart);
