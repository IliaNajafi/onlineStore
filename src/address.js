document.getElementById("backButton").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

const addresses = [
  { label: "Home", address: "61480 Sunbrook Park, PC 5679" },
  { label: "Office", address: "6993 Meadow Valley Terra, PC 3637" },
  { label: "Apartment", address: "21833 Clyde Gallagher, PC 4662" },
  { label: "Parent's House", address: "5259 Blue Bill Park, PC 4627" },
];
window.addEventListener("DOMContentLoaded", () => {
  const firstOption = document.querySelector(
    "input[name='address'][value='0']"
  );
  if (firstOption) {
    firstOption.checked = true;
    localStorage.setItem("selectedAddress", JSON.stringify(addresses[0]));
  }
});

document.getElementById("applyAddress").addEventListener("click", () => {
  const selected = document.querySelector("input[name='address']:checked");
  if (selected) {
    const index = Number(selected.value);
    const selectedAddress = addresses[index];
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    window.location.href = "checkout.html";
  }
});
