import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, alertMessage  } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  // Check if cartContents is not an array or null
  if (!Array.isArray(cartContents) || cartContents === null) {
    // Initialize cartContents as an empty array
    cartContents = [];
  }
  // then add the current product to the list
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);

  alertMessage(`${product.NameWithoutBrand} added to cart!`);
}

function renderProductDetails() {
  // Calculate and display discount
  const discount = calculateDiscount(product.SuggestedRetailPrice, product.FinalPrice);
  const discountElement = document.createElement("p");
  discountElement.id = "productDiscount";
  discountElement.textContent = `${discount}% OFF!`;
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#SuggestedRetailPrice").innerText = `$${product.SuggestedRetailPrice}`;
  document.querySelector("#productFinalPrice").innerText = `Now $${product.FinalPrice}`;
  document.querySelector("#productDiscount").innerText = discountElement.textContent;
  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

function calculateDiscount(listedPrice, finalPrice) {
  // Parse input values as numbers
  const originalPrice = parseFloat(listedPrice)
  const discount = ((originalPrice - parseFloat(finalPrice)) / originalPrice) * 100;

  // Check for NaN or Infinity
  if (isNaN(discount) || !isFinite(discount)) {
    return 0; // Return 0% discount in case of invalid values
  }
  return discount.toFixed(0); // Round to one decimal place
}