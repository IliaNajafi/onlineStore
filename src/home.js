const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
if (!user || !token) {
  window.location.href = "/login.html";
}

function getGreetingMessage() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning 👋";
  if (hour >= 12 && hour < 16) return "Good noon 👋";
  if (hour >= 16 && hour < 21) return "Good evening 👋";
  return "Good night";
}
document.getElementById("greetingMessage").textContent = getGreetingMessage();
document.getElementById("usernameDisplay").textContent = user.username;

let page = 1;
const limit = 10;
let loading = false;
let currentBrand = "";
let totalPages = 0;

// Load Products
async function loadProducts() {
  if (loading) return;
  loading = true;
  document.getElementById("loading").classList.remove("hidden");

  try {
    let url = `http://localhost:3000/sneaker?page=${page}&limit=${limit}`;
    if (currentBrand) url += `&brands=${currentBrand}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Data Loading failed!");

    const data = await res.json();
    const container = document.getElementById("productContainer");
    totalPages = data.totalPages;
    data.data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "bg-[#F3F3F3] rounded-xl p-3 ";
      card.innerHTML = `
        <img src="${item.imageURL}" alt="${
        item.name
      }" class="w-full h-32 object-contain mb-2" />
        <p class="text-[20px] font-bold text-[#152536] leading-tight line-clamp-1 mb-1">${
          item.name
        }</p>
        <p class="text-[16px] font-semibold">$ ${item.price.toFixed(2)}</p>
      `;
      card.addEventListener("click", () => {
        localStorage.setItem("selectedProductId", item.id);
        console.log("Clicked ID:", item.id);
        window.location.href = "product.html";
      });

      container.appendChild(card);
    });

    page++;
  } catch (err) {
    console.error("Failed to load products:", err);
  } finally {
    loading = false;
    document.getElementById("loading").classList.add("hidden");
  }
}
async function loadBrands() {
  try {
    const res = await fetch("http://localhost:3000/sneaker/brands", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch brands");

    const brands = await res.json();
    renderBrandButtons(brands);
  } catch (err) {
    console.error("Error loading brands:", err);
  }
}

function renderBrandButtons(brands) {
  const brandContainer = document.getElementById("brandContainer");
  brandContainer.innerHTML = "";
  const allBtn = createBrandButton("All", "");
  brandContainer.appendChild(allBtn);
  highlightSelectedButton(allBtn);

  brands.forEach((brand) => {
    const btn = createBrandButton(brand, brand);
    brandContainer.appendChild(btn);
  });
  currentBrand = "";
  page = 1;
  document.getElementById("productContainer").innerHTML = "";
  loadProducts();
}

function createBrandButton(label, brandValue) {
  const btn = document.createElement("button");
  btn.className =
    "text-sm px-4 py-1 rounded-full border border-[#343A40] hover:bg-gray-200 whitespace-nowrap mb-5";
  btn.textContent = label;

  btn.addEventListener("click", () => {
    currentBrand = brandValue;
    page = 1;
    document.getElementById("productContainer").innerHTML = "";
    highlightSelectedButton(btn);
    loadProducts();
  });

  return btn;
}

function highlightSelectedButton(activeBtn) {
  const buttons = document.querySelectorAll("#brandContainer button");
  buttons.forEach((btn) => {
    btn.classList.remove("bg-[#343A40]", "text-white");
    btn.classList.add("border", "border-[#343A40]");
  });
  activeBtn.classList.add("bg-[#343A40]", "text-white");
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight + 400 >=
      document.documentElement.scrollHeight &&
    page <= totalPages
  ) {
    loadProducts();
  }
});

document.getElementById("cartBtn")?.addEventListener("click", () => {
  window.location.href = "cart.html";
});

document.getElementById("homeBtn")?.addEventListener("click", () => {
  window.location.href = "home.html";
});

loadBrands();
