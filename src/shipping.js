document.getElementById("backButton").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

const Shippings = [
  { label: "Economy", shipping: "Estimated Arrival, Dec 20-23", cost: 10 },
  { label: "Regular", shipping: "Estimated Arrival, Dec 20-22", cost: 15 },
  { label: "Cargo", shipping: "Estimated Arrival, Dec 19-20", cost: 20 },
  { label: "Express", shipping: "Estimated Arrival, Dec 18-19", cost: 30 },
];

document.getElementById("applyShipping").addEventListener("click", () => {
  const selected = document.querySelector("input[name='shipping']:checked");
  if (selected) {
    const index = Number(selected.value);
    const selectedShipping = Shippings[index];
    localStorage.setItem("selectedShipping", JSON.stringify(selectedShipping));
    window.location.href = "checkout.html";
  } else {
    alert("Please select a shipping option.");
  }
});
