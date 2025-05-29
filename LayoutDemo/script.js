const products = {
  1: { name: "Bánh Mỳ", price: 30000, img: "Image/imageBanhMy.jpg" },
  2: { name: "Bánh Cuốn", price: 25000, img: "Image/imageBanhCuon.jpg" },
  3: { name: "Phở Bò", price: 35000, img: "Image/imagePho.jpg" },
  4: { name: "Xôi Ngũ Vị", price: 40000, img: "Image/imageXoi.jpg" },
  5: { name: "Bánh Xèo", price: 50000, img: "Image/imagebanhxeo.jpg" },
  6: { name: "Cơm Tấm", price: 60000, img: "Image/imageCom.jpg" },
};

let cart = {};

function addToCart(id) {
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { ...products[id], qty: 1 };
  }
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  Object.keys(cart).forEach((id) => {
    const item = cart[id];
    const subtotal = item.price * item.qty;
    total += subtotal;

    const li = document.createElement("li");
    li.className = "cart-item";

    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-details">
        <div>${item.name}</div>
        <div>${subtotal.toLocaleString()}</div>
      </div>
      <div class="cart-item-controls">
        <button onclick="updateQty(${id}, -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="updateQty(${id}, 1)">+</button>
      </div>
    `;

    cartItems.appendChild(li);
  });

  document.getElementById("total").innerText = total.toLocaleString();
}

function updateQty(id, change) {
  cart[id].qty += change;
  if (cart[id].qty <= 0) delete cart[id];
  renderCart();
}

function clearCart() {
  cart = {};
  renderCart();
}
