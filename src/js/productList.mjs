import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
  }

export default async function productList(selector, category){
  // get the element we will insert the list into from the selector
  const element = document.querySelector(selector);
  // get the list of products 
  const products = await getData(category);
  // Take only the first 4 products
  const firstFourProducts = products.slice(0, 4);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, element, firstFourProducts);
  document.querySelector(".title").innerHTML = category;
}