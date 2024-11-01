import { cart } from "../data/carts.js";
import { products } from "../data/products.js";
let productHtml = "";
products.forEach((prodcut, index) => {
  productHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${prodcut.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${prodcut.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${prodcut.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              prodcut.rating.count
            }</div>
          </div>

          <div class="product-price">$${(prodcut.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${prodcut.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-text-${prodcut.id}" >
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            prodcut.id
          }">
          Add to Cart
          </button>
        </div>
  `;
});
document.querySelector(".js-products-grid").innerHTML = productHtml;
// end generating the products

// start button interactivity
let timeoutId;
function AddText(productId) {
  let addedTextElement = document.querySelector(`.js-added-text-${productId}`);

  addedTextElement.classList.add("added-to-cart-visible");

  //  remove the class

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    addedTextElement.classList.remove("added-to-cart-visible");
  }, 1000);
}
function AddToCart(productId, selectorValue) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
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
function UpdateCart() {
  let cartItemsQuantity = 0;

  cart.forEach((item) => {
    cartItemsQuantity += item.quantity;
  });
  console.log(cart);

  document.querySelector(".js-cart-quantity").innerHTML = cartItemsQuantity;
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    // add the selector quantity
    let selectorValue = parseInt(
      document.querySelector(`.js-quantity-selector-${productId}`).value,
      10
    );

    AddText(productId);
    AddToCart(productId, selectorValue);
    UpdateCart();
  });
});
// end btn interactivity
