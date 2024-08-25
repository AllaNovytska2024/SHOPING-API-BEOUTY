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
};

getProducts();
