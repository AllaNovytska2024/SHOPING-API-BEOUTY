const containerProducts = document.querySelector("#container-products");
const loader = document.querySelector("#loader");

const products = [];
let cart = [];

const getProducts = () => {
  // добавили loader
  loader.classList.toggle("loader-hide");
  // искусственно чуть замедлили появление карточек
  setTimeout(async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    data.map((product) => {
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
    });
    // убрали loader
    loader.classList.toggle("loader-hide");
  }, 1000);

  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.title;
  option.dataset.price = product.price;
  productSelect.appendChild(option);
};

getProducts();

//пытаемся добавить корзину рабочую

function addToCart(product) {
  // Проверка на повтор
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      cart.push({ ...product, quantity: 1 });
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContainer = document.querySelector("#cart-container");
  cartContainer.innerHTML = ""; // Очистка текущего содержимого

  cart.forEach(item => {
      const productElement = document.createElement("div");
      productElement.textContent = `${item.name} x ${item.quantity}`;
      cartContainer.appendChild(productElement);
  });
}



containerProducts.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        const productId = event.target.dataset.productId;
        const productName = event.target.dataset.productName;
        const product = { id: productId, name: productName };
        addToCart(product);
    }
});
