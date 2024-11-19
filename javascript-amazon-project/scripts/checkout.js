import { cart, DeleteFromCart, updateCartQunatity } from "../data/carts.js";
import { products } from "../data/products.js";
import { formatCurency } from "./utils/money.js";

let cartHtml = "";
cart.forEach((cartItem, index) => {
  const prodcutId = cartItem.productId;
  let matchingItem;
  products.forEach((product) => {
    if (product.id === prodcutId) {
      matchingItem = product;
    }
  });
  //   console.log(matchingItem);
  // base html to load
  cartHtml += `
        <div class="cart-item-container js-cart-item-container-${
          matchingItem.id
        } ">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link-cart-product" data-product-id="${
                    matchingItem.id
                  }" >
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-link-cart-product" data-product-id="${
                    matchingItem.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
});

document.querySelector(".js-order-summary").innerHTML = cartHtml;

// delete btn interartivity
document.querySelectorAll(".js-link-cart-product").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    DeleteFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
  });
});

// update btn interartivity
document.querySelectorAll(".js-update-link-cart-product").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    console.log(productId);
  });
});
// load cart quntity
let cartItemNumber = document.querySelector(".js-checkout");
updateCartQunatity(cartItemNumber, " items");
