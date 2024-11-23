import { cart, calculateCartQuantity } from "../../data/carts.js";
import { products, getProduct } from "../../data/products.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { formatCurency } from "../utils/money.js";

export function renderPaymentSummary() {
  const itemsNumber = calculateCartQuantity();

  console.log(itemsNumber);
  let unitPrice = 0;
  let itemQuantity = 0;
  let totalItemsPrice = 0;
  let shipingPrice = 0;

  cart.forEach((cartItem) => {
    const prodcutId = cartItem.productId;
    let matchingItem = getProduct(prodcutId);

    unitPrice = Number(formatCurency(matchingItem.priceCents));
    itemQuantity = cartItem.quantity;
    totalItemsPrice += itemQuantity * unitPrice;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shipingPrice += Number(formatCurency(deliveryOption.priceCents));
  });

  //   console.log(totalItemsPrice);
  //   console.log(` shiping price: ${shipingPrice}`);
  // formating
  totalItemsPrice = Math.round(totalItemsPrice * 100) / 100;

  let TotalBeforeTax = totalItemsPrice + shipingPrice;
  TotalBeforeTax = Math.round(TotalBeforeTax * 100) / 100;

  let EstimatedTax = TotalBeforeTax * (10 / 100);
  EstimatedTax = Math.round(EstimatedTax * 100) / 100;

  let OrderTotal = EstimatedTax + TotalBeforeTax;
  OrderTotal = Math.round(OrderTotal * 100) / 100;
  console.log(
    `TotalBeforeTax ${TotalBeforeTax}  EstimatedTax:${EstimatedTax}  OrderTotal ${OrderTotal}`
  );
  let paymentHTML = `
            
                <div class="payment-summary-title">Order Summary</div>

                <div class="payment-summary-row">
                    <div>Items (${itemsNumber}):</div>
                    <div class="payment-summary-money">$${totalItemsPrice}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${shipingPrice}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${TotalBeforeTax}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${EstimatedTax}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${OrderTotal}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>
            
        `;
  document.querySelector(".js-payment-summary").innerHTML = paymentHTML;
}
