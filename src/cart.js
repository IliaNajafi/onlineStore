const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartContainer");
const totalPriceEl = document.getElementById("totalPrice");
let pendingRemoveIndex = null;
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-gray-500 text-center">Your cart is empty.</p>`;
    totalPriceEl.textContent = "$0.00";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const card = document.createElement("div");
    card.className = "flex gap-4 items-center bg-white rounded-xl p-5 relative";

    card.innerHTML = `
      <img src="${item.imageURL}" alt="${
      item.name
    }" class="w-20 h-20 object-contain rounded-md" />
      <div class="flex flex-col justify-between flex-1">
        <div>
          <h2 class="font-semibold text-sm mb-1">${item.name}</h2>
          <p class="text-sm text-gray-500 capitalize flex items-center gap-2">
            <span class="inline-block w-4 h-4 rounded-full" style="background-color: ${
              item.color
            }; ${
      item.color === "white" ? "border: 1px solid black;" : ""
    }"></span>
            ${item.color} | Size: ${item.size}
          </p>
        </div>
        <div class="flex justify-between items-center mt-2">
          <span class="font-bold text-xl">$${(
            item.price * item.quantity
          ).toFixed(2)}</span>
          <div class="bg-gray-100 rounded-3xl flex items-center gap-3 text-sm p-2">
            <button class="text-lg font-bold px-2" data-decrease="${index}">-</button>
            <span class="font-extrabold">${item.quantity}</span>
            <button class="text-lg font-bold px-2" data-increase="${index}">+</button>
          </div>
        </div>
      </div>
      <button class="absolute top-5 right-3" data-remove="${index}">
        <img src="/icons/trashIcon.svg" class="w-5 h-5" alt="Remove" />
      </button>
    `;

    cartContainer.appendChild(card);
  });

  totalPriceEl.textContent = `$${total.toFixed(2)}`;
}
function updateCartAndSave() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

cartContainer.addEventListener("click", (e) => {
  const dec = e.target.dataset.decrease;
  const inc = e.target.dataset.increase;
  const rem = e.target.closest("[data-remove]")?.dataset.remove;

  if (dec !== undefined) {
    if (cart[dec].quantity > 1) {
      cart[dec].quantity--;
      updateCartAndSave();
    }
  }

  if (inc !== undefined) {
    cart[inc].quantity++;
    updateCartAndSave();
  }
  // modal section
  if (rem !== undefined) {
    pendingRemoveIndex = Number(rem);
    const item = cart[pendingRemoveIndex];
    document.getElementById("modalItemImage").src = item.imageURL;
    document.getElementById("modalItemName").textContent = item.name;
    document.getElementById("modalItemPrice").textContent = `$${(
      item.price * item.quantity
    ).toFixed(2)}`;
    document.getElementById("modalItemDetail").innerHTML = ` 
      <span class="inline-block w-4 h-4 rounded-full" style="background-color: ${
        item.color
      }; ${item.color === "white" ? "border: 1px solid black;" : ""}"></span>
      ${item.color} | Size: ${item.size}
    `;

    document.getElementById("modalQuantityWrapper").innerHTML = `
      <div class="bg-gray-100 rounded-3xl flex items-center gap-3 text-sm p-2 justify-center mt-4">
        <button id="modalDecreaseQty" class="text-lg font-bold px-2">-</button>
        <span id="modalQtyDisplay" class="font-extrabold">${item.quantity}</span>
        <button id="modalIncreaseQty" class="text-lg font-bold px-2">+</button>
      </div>
    `;
    const modal = document.getElementById("removeModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document
      .getElementById("modalDecreaseQty")
      .addEventListener("click", () => {
        if (cart[pendingRemoveIndex].quantity > 1) {
          cart[pendingRemoveIndex].quantity--;
          document.getElementById("modalQtyDisplay").textContent =
            cart[pendingRemoveIndex].quantity;
          document.getElementById("modalItemPrice").textContent = `$${(
            cart[pendingRemoveIndex].price * cart[pendingRemoveIndex].quantity
          ).toFixed(2)}`;
          updateCartAndSave();
        }
      });

    document
      .getElementById("modalIncreaseQty")
      .addEventListener("click", () => {
        cart[pendingRemoveIndex].quantity++;
        document.getElementById("modalQtyDisplay").textContent =
          cart[pendingRemoveIndex].quantity;
        document.getElementById("modalItemPrice").textContent = `$${(
          cart[pendingRemoveIndex].price * cart[pendingRemoveIndex].quantity
        ).toFixed(2)}`;
        updateCartAndSave();
      });
  }
});
document.getElementById("cancelRemove")?.addEventListener("click", () => {
  const modal = document.getElementById("removeModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  pendingRemoveIndex = null;
});
document.getElementById("confirmRemove")?.addEventListener("click", () => {
  if (pendingRemoveIndex !== null) {
    cart.splice(pendingRemoveIndex, 1);
    updateCartAndSave();
    const modal = document.getElementById("removeModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    pendingRemoveIndex = null;
  }
});
renderCart();
const currentPage = window.location.pathname;
const navButtons = [
  { id: "homeBtn", page: "home.html" },
  { id: "cartBtn", page: "cart.html" },
];

navButtons.forEach(({ id, page }) => {
  const btn = document.getElementById(id);
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.location.href = page;
  });

  if (currentPage.includes(page)) {
    btn.classList.remove("text-gray-400");
    btn.classList.add("text-black");
  } else {
    btn.classList.remove("text-black");
    btn.classList.add("text-gray-400");
  }
});
document.getElementById("checkoutBtn")?.addEventListener("click", () => {
  window.location.href = "checkout.html";
});
