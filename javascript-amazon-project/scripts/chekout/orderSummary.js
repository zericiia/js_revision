import {
  cart,
  DeleteFromCart,
  updateCartQunatity,
  UpdateDeliveyOption,
} from "../../data/carts.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "../chekout/paymentSummary.js";
export function renderOrderSummery() {
  let cartHtml = "";
  cart.forEach((cartItem, index) => {
    const prodcutId = cartItem.productId;
    const deliveryOptionID = cartItem.deliveryOptionId;
    let matchingItem = getProduct(prodcutId);
    let deliveryOption = getDeliveryOption(deliveryOptionID);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dayString = deliveryDate.format("dddd, MMMM D");

    cartHtml += `
            <div class="cart-item-container js-cart-item-container-${
              matchingItem.id
            } ">
                <div class="delivery-date">
                  Delivery date: ${dayString}
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
                    ${deliveryOptionHTML(matchingItem, cartItem)}
                    
                    
                  </div>
                </div>
              </div>
        `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartHtml;

  function deliveryOptionHTML(matchingItem, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dayString = deliveryDate.format("dddd, MMMM D");
      const deliveryPrice =
        deliveryOption.priceCents === 0
          ? "FREE -"
          : `$${formatCurency(deliveryOption.priceCents)} -`;
      const isCheked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option"  
        data-product-id="${matchingItem.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isCheked ? `checked` : ``}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dayString}
            </div>
            <div class="delivery-option-price">
              ${deliveryPrice}  Shipping
            </div>
          </div>
        </div>
        `;
    });
    return html;
  }
  // delete btn interartivity
  document.querySelectorAll(".js-link-cart-product").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      DeleteFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      renderPaymentSummary();
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
  // input button clicked render the page
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;

      UpdateDeliveyOption(productId, deliveryOptionId);
      renderOrderSummery();
      renderPaymentSummary();
    });
  });
}
