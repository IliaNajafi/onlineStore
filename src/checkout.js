document.getElementById("backButton").addEventListener("click", () => {
  window.location.href = "cart.html";
});

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderListContainer = document.getElementById("checkoutProductList");
const amountElement = document.getElementById("amountPrice");
const shippingElement = document.getElementById("shippingPrice");
const totalElement = document.getElementById("totalPrice");

let shippingCost = 0;
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

/// Shipping Section
const selectedShipping = localStorage.getItem("selectedShipping");
const shippingTypeElement = document.getElementById("shippingType");

if (selectedShipping) {
  const { label, shipping, cost = 0 } = JSON.parse(selectedShipping);
  shippingCost = cost;

  if (shippingTypeElement) {
    shippingTypeElement.textContent = `${label} (${shipping}) - $${cost}`;
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

document.getElementById("chooseAddressBtn")?.addEventListener("click", () => {
  window.location.href = "address.html";
});
document.getElementById("chooseShippingBtn")?.addEventListener("click", () => {
  window.location.href = "shipping.html";
});

/// Promo Code Section
document.getElementById("applyPromoBtn")?.addEventListener("click", () => {
  const input = document.getElementById("promoInput");
  const promoContainer = document.getElementById("promoContainer");
  const code = input.value.trim();
  if (code !== "") {
    promoContainer.innerHTML = `
      <div class="flex items-center justify-between bg-black text-white rounded-full px-4 py-2 w-fit text-sm font-medium">
        <span>Discount 30% Off</span>
        <button id="removePromo" class="ml-2 text-white text-base">×</button>
      </div>
    `;
    const amount = parseFloat(amountElement.textContent.replace("$", ""));
    const discount = amount * 0.3;
    const newTotal = (amount + shippingCost - discount).toFixed(2);
    totalElement.textContent = `$${newTotal}`;
    const discountSec = document.getElementById("discountSec");
    const discountAmount = document.getElementById("discountAmount");
    if (discountSec && discountAmount) {
      discountSec.classList.remove("hidden");
      discountAmount.textContent = `-$${discount.toFixed(2)}`;
    }

    document.getElementById("removePromo").addEventListener("click", () => {
      promoContainer.innerHTML = `
        <input
          id="promoInput"
          type="text"
          placeholder="Enter Promo Code"
          class="w-full text-sm bg-transparent focus:outline-none"
        />
      `;
      const resetTotal = (amount + shippingCost).toFixed(2);
      totalElement.textContent = `$${resetTotal}`;
      if (discountSec && discountAmount) {
        discountSec.classList.add("hidden");
        discountAmount.textContent = "-$0.00";
      }
    });
  }
});
