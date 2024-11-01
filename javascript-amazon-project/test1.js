import { cart } from "./test2.js";

function clickme() {
  console.log(cart);
}
document.querySelector("button").addEventListener("click", clickme);
