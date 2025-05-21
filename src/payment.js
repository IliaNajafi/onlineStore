document.getElementById("backButton").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

document.getElementById("confirmPaymentBtn")?.addEventListener("click", () => {
  const selected = document.querySelector('input[name="payment"]:checked');
  if (!selected) {
    alert("you have to select a payment method");
    return;
  }
  const modal = document.getElementById("successModal");
  modal.classList.remove("hidden");
});

document.getElementById("confirmSuccessBtn")?.addEventListener("click", () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("selectedShipping");
  localStorage.removeItem("selectedAddress");
  window.location.href = "home.html";
});
