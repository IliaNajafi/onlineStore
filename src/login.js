import axios from "axios";

// loginElements
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const signinBtn = document.getElementById("signinBtn");

// signupElements
const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const signupUsernameError = document.getElementById("signupUsernameError");
const signupPasswordError = document.getElementById("signupPasswordError");
const signupBtn = document.getElementById("signupBtn");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

document.getElementById("goToSignup").addEventListener("click", () => {
  loginForm.classList.add("hidden");
  signinBtn.classList.add("hidden");
  signupForm.classList.remove("hidden");
  signupBtn.classList.remove("hidden");
});

document.getElementById("goToLogin").addEventListener("click", () => {
  signupForm.classList.add("hidden");
  signupBtn.classList.add("hidden");
  loginForm.classList.remove("hidden");
  signinBtn.classList.remove("hidden");
});

const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const eyeOffIcon = document.getElementById("eyeOffIcon");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    eyeIcon.classList.toggle("hidden", !isHidden);
    eyeOffIcon.classList.toggle("hidden", isHidden);
  });
}

const toggleSignupPassword = document.getElementById("toggleSignupPassword");
const signupEyeIcon = document.getElementById("signupEyeIcon");
const signupEyeOffIcon = document.getElementById("signupEyeOffIcon");

if (toggleSignupPassword && signupPassword) {
  toggleSignupPassword.addEventListener("click", () => {
    const isHidden = signupPassword.type === "password";
    signupPassword.type = isHidden ? "text" : "password";
    signupEyeIcon.classList.toggle("hidden", !isHidden);
    signupEyeOffIcon.classList.toggle("hidden", isHidden);
  });
}
function validatePassword(password) {
  const errors = [];
  if (password.length < 8) errors.push("use at least 8 characters");
  if (!/[A-Z]/.test(password))
    errors.push("use at least one UPPERCASE character");
  if (!/[0-9]/.test(password)) errors.push("use at least one number");
  if (!/[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]/.test(password))
    errors.push("use at least one special character");
  return errors.join("، ");
}
function validateLogin() {
  const username = usernameInput?.value.trim();
  const password = passwordInput?.value.trim();
  const passwordMessage = validatePassword(password);

  usernameError.textContent = username === "" ? "username cannot be empty" : "";
  passwordError.textContent = passwordMessage;

  const isValid = username !== "" && passwordMessage === "";

  signinBtn.disabled = !isValid;
  signinBtn.classList.toggle("opacity-50", !isValid);
  signinBtn.classList.toggle("cursor-not-allowed", !isValid);
}
function validateSignup() {
  const username = signupUsername?.value.trim();
  const password = signupPassword?.value.trim();
  const passwordMessage = validatePassword(password);

  let isValid = true;

  if (username === "") {
    signupUsernameError.textContent = "username cannot be empty";
    isValid = false;
  } else {
    signupUsernameError.textContent = "";
  }

  if (passwordMessage !== "") {
    signupPasswordError.textContent = passwordMessage;
    isValid = false;
  } else {
    signupPasswordError.textContent = "";
  }

  signupBtn.disabled = !isValid;
  signupBtn.classList.toggle("opacity-50", !isValid);
  signupBtn.classList.toggle("cursor-not-allowed", !isValid);
}
usernameInput?.addEventListener("input", validateLogin);
passwordInput?.addEventListener("input", validateLogin);
signupUsername?.addEventListener("input", validateSignup);
signupPassword?.addEventListener("input", validateSignup);

const backButton = document.querySelector("button.text-xl");
if (backButton) {
  backButton.addEventListener("click", () => {
    window.location.href = "onboarding.html";
  });
}

// axios start here
signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = signupUsername.value.trim();
  const password = signupPassword.value.trim();

  try {
    const res = await axios.post("http://localhost:3000/auth/signup", {
      username,
      password,
    });

    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "home.html";
  } catch (error) {
    alert(error.response?.data?.message || "Signup failed.");
  }
});

signinBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  try {
    const res = await axios.post("http://localhost:3000/auth/login", {
      username,
      password,
    });

    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "home.html";
  } catch (error) {
    alert(error.response?.data?.message || "Login failed.");
  }
});
