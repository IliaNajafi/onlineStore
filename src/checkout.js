document.getElementById("backButton").addEventListener("click", () => {
  window.location.href = "cart.html";
});

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderListContainer = document.getElementById("checkoutProductList");
const amountElement = document.getElementById("amountPrice");
const shippingElement = document.getElementById("shippingPrice");
const totalElement = document.getElementById("totalPrice");
// watch out
let shippingCost = 0;
// watch out
const selectedAddress = localStorage.getItem("selectedAddress");
if (selectedAddress) {
  const { label, address } = JSON.parse(selectedAddress);
  const container = document.querySelector("#shippingAddress");
  if (container) {
    container.innerHTML = `
      <div class="flex gap-3 items-center">
        <div>
          <p class="font-bold text-sm">${label}</p>
          <p class="text-sm text-gray-500">${address}</p>
        </div>
      </div>
    `;
  }
}

function renderOrderList() {
  orderListContainer.innerHTML = "";
  let totalAmount = 0;

  cart.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "flex justify-between items-center bg-white rounded-xl p-4";

    card.innerHTML = `
      <div class="flex gap-4 items-center">
        <img src="${item.imageURL}" alt="${
      item.name
    }" class="w-16 h-16 object-contain rounded-md" />
        <div class="flex flex-col justify-between">
          <h2 class="font-semibold text-sm mb-1">${item.name}</h2>
          <p class="text-sm text-gray-500 capitalize flex items-center gap-2">
            <span class="inline-block w-4 h-4 rounded-full" style="background-color: ${
              item.color
            }; ${
      item.color === "white" ? "border: 1px solid black;" : ""
    }"></span>
            ${item.color} | Size: ${item.size}
          </p>
          <span class="font-bold text-base mt-1">$${(
            item.price * item.quantity
          ).toFixed(2)}</span>
        </div>
      </div>
      <div class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-bold">
        ${item.quantity}
      </div>
    `;

    orderListContainer.appendChild(card);
    totalAmount += item.price * item.quantity;
  });
  amountElement.textContent = `$${totalAmount.toFixed(2)}`;
  shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
  totalElement.textContent = `$${(totalAmount + shippingCost).toFixed(2)}`;
}
renderOrderList();

document.getElementById("chooseShippingBtn")?.addEventListener("click", () => {
  window.location.href = "address.html";
});
