import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
  }
function renderList(product) {
    productCardTemplate()
    document.querySelector("#card__brand").innerText = product.Brand.Name;
    document.querySelector("#card__name").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#product-card__price").innerText = `$${product.FinalPrice}`;
}

export default async function productList(selector, category){
    // get the element we will insert the list into from the selector
    const element = document.querySelector(selector);
    // get the list of products 
    const products = await getData(category);
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, element, products);

    
}
