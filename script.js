// script.js
const containerProducts = document.querySelector("#container-products");
const loader = document.querySelector("#loader");
const productSelect = document.querySelector("#productSelect");
const cartList = document.querySelector("#cartList");
const totalPriceElement = document.querySelector("#totalPrice");

let cart = [];

const getProducts = async () => {
  loader.classList.toggle("loader-hide");
  setTimeout(async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    data.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      const heading = document.createElement("h4");
      heading.textContent = product.title;
      const price = document.createElement("p");
      price.textContent = `Price: ${Math.floor(product.price)} €`;
      const img = document.createElement("img");
      img.src = product.image;
      img.classList.add("card-img");
      card.append(heading, price, img);
      containerProducts.append(card);

      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = `${product.title} - $${product.price}`;
      productSelect.appendChild(option);
    });
    loader.classList.toggle("loader-hide");
  }, 1000);
};

getProducts();

function addToCart(productId, quantity) {
  const selectedOption = productSelect.options[productSelect.selectedIndex];
  const productName = selectedOption.textContent.split(' - ')[0];
  const productPrice = parseFloat(selectedOption.textContent.split(' - $')[1]);

  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  cartList.innerHTML = ''; // Очистка текущего содержимого

  cart.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} x ${item.quantity}`;
    cartList.appendChild(listItem);
  });

  const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);
  totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

document.querySelector("#priceForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const productId = parseInt(productSelect.value);
  const quantity = parseInt(document.querySelector("#quantity").value);
  addToCart(productId, quantity);
});