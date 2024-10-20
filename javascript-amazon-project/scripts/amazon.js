// const products = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       starts: 4.5,
//       count: 87,
//     },
//     priceCents: 1090,
//   },
//   {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//       starts: 4,
//       count: 127,
//     },
//     priceCents: 2095,
//   },
//   {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       starts: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//   },
//   {
//     image: "images/products/black-2-slot-toaster.jpg",
//     name: "2 Slot Toaster - Black",
//     rating: {
//       starts: 5,
//       count: 2197,
//     },
//     priceCents: 1899,
//   },
// ];
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

          <div class="added-to-cart">
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

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    // add the selector quantity
    let selectorValue = parseInt(
      document.querySelector(`.js-quantity-selector-${productId}`).value,
      10
    );
    console.log(selectorValue);

    let matchingItem;
    // check if it exist in the cart before
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
    let cartItemsQuantity = 0;

    cart.forEach((item) => {
      cartItemsQuantity += item.quantity;
    });
    console.log(cart);

    document.querySelector(".js-cart-quantity").innerHTML = cartItemsQuantity;
  });
});
// end btn interactivity
