const token = localStorage.getItem("token");
const productId = localStorage.getItem("selectedProductId");

if (!productId || !token) {
  window.location.href = "home.html";
}

let selectedSize = null;
let selectedColor = null;
let quantity = 1;
let currentProduct = null;

function updateTotalPrice(price) {
  const total = price * quantity;
  document.getElementById("productPrice").textContent = `$${total.toFixed(2)}`;
  document.getElementById("quantityDisplay").textContent = quantity;
}

async function fetchProduct() {
  try {
    const url = `http://localhost:3000/sneaker/item/${productId}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const product = await res.json();
    currentProduct = product;
    document.getElementById("productImage").src = product.imageURL;
    document.getElementById("productName").textContent =
      product.name || "No Name";
    updateTotalPrice(product.price);
    const desc = document.getElementById("productDescription");
    const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
    dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa,
    varius a, semper congue, euismod non, mi.`;
    let expanded = false;

    function getTruncated(text, wordLimit = 15) {
      const words = text.split(" ");
      return words.slice(0, wordLimit).join(" ") + " ";
    }

    function renderDescription() {
      desc.innerHTML = expanded
        ? `${fullText} <span id="toggleBtn" class="font-bold cursor-pointer"> show less...</span>`
        : `${getTruncated(
            fullText
          )}<span id="toggleBtn" class="font-bold cursor-pointer"> view more...</span>`;
      document.getElementById("toggleBtn").addEventListener("click", () => {
        expanded = !expanded;
        renderDescription();
      });
    }
    renderDescription();
    const sizeContainer = document.getElementById("sizeOptions");
    sizeContainer.innerHTML = "";
    const sizes = product.sizes ? product.sizes.split("|") : ["41", "43", "45"];
    sizes.forEach((size) => {
      const btn = document.createElement("button");
      btn.className = "w-10 h-10 rounded-full border border-gray-800 ";
      btn.textContent = size;
      btn.addEventListener("click", () => {
        selectedSize = size;
        document.querySelectorAll("#sizeOptions button").forEach((b) => {
          b.classList.remove("bg-black", "text-white");
        });
        btn.classList.add("bg-black", "text-white");
      });
      sizeContainer.appendChild(btn);
    });
    const colorContainer = document.getElementById("colorOptions");
    colorContainer.innerHTML = "";
    const colors = product.colors
      ? product.colors.split("|")
      : ["black", "gray"];
    colors.forEach((color) => {
      const dot = document.createElement("div");
      dot.className =
        "w-10 h-10 rounded-full cursor-pointer flex items-center justify-center relative shrink-0";
      dot.style.backgroundColor = color;

      const check = document.createElement("span");
      check.innerHTML = "✔";
      check.className = "text-black text-xl font-bold hidden";
      dot.appendChild(check);

      dot.addEventListener("click", () => {
        selectedColor = color;
        document
          .querySelectorAll("#colorOptions span")
          .forEach((el) => el.classList.add("hidden"));
        check.classList.remove("hidden");
      });

      colorContainer.appendChild(dot);
    });
  } catch (err) {
    console.error("Error loading product:", err);
    alert("Failed to load product.");
    window.location.href = "home.html";
  }
}

fetchProduct();

document.getElementById("decreaseQty")?.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    updateTotalPrice(currentProduct.price);
  }
});

document.getElementById("increaseQty")?.addEventListener("click", () => {
  quantity++;
  updateTotalPrice(currentProduct.price);
});

document.getElementById("backButton").addEventListener("click", () => {
  window.location.href = "home.html";
});

document.getElementById("addToCartBtn")?.addEventListener("click", () => {
  if (!selectedSize || !selectedColor) {
    alert("Please select both size and color.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    imageURL: currentProduct.imageURL,
    quantity,
    size: selectedSize,
    color: selectedColor,
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  selectedSize = null;
  selectedColor = null;
  quantity = 1;
  updateTotalPrice(currentProduct.price);
  document.getElementById("quantityDisplay").textContent = "1";
  document
    .querySelectorAll("#sizeOptions button")
    .forEach((b) => b.classList.remove("bg-black", "text-white"));
  document
    .querySelectorAll("#colorOptions span")
    .forEach((s) => s.classList.add("hidden"));

  alert("Added to cart!");
});
