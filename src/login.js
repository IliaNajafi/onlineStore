const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const eyeOffIcon = document.getElementById("eyeOffIcon");
const backButton = document.querySelector("button.text-xl");
const usernameInput = document.querySelector('input[type="text"]');
const signinBtn = document.getElementById("signinBtn");
const passwordError = document.getElementById("passwordError");
const usernameError = document.getElementById("usernameError");

if (passwordInput && togglePassword && eyeIcon && eyeOffIcon) {
  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    eyeIcon.classList.toggle("hidden", !isHidden);
    eyeOffIcon.classList.toggle("hidden", isHidden);
  });
}

if (backButton) {
  backButton.addEventListener("click", () => {
    window.location.href = "onboarding.html#last";
  });
}

function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push("use at least 8 characters");
  }
  if (!/[A-Z]/.test(password))
    errors.push("use at least one UPPERCASE character");
  if (!/[0-9]/.test(password)) errors.push("use at least one number");
  if (!/[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]/.test(password))
    errors.push("use at lesat one special character");

  if (errors.length === 0) return "";

  return errors.join("، ");
}

function validateInputs() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordMessage = validatePassword(password);

  if (username === "") {
    usernameError.textContent = "username cannot be empty";
  } else {
    usernameError.textContent = "";
  }

  passwordError.textContent = passwordMessage;
  if (username !== "" && passwordMessage === "") {
    signinBtn.disabled = false;
    signinBtn.classList.remove("opacity-50", "cursor-not-allowed");
  } else {
    signinBtn.disabled = true;
    signinBtn.classList.add("opacity-50", "cursor-not-allowed");
  }
}

usernameInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);
