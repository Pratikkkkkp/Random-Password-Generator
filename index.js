const btnEl = document.querySelector(".btn");
const inputEl = document.getElementById("input");
const copyIconEl = document.querySelector(".fa-copy");
const alertContainerEl = document.querySelector(".alert-container");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const strengthEl = document.getElementById("strength");

// Generate Password Button Click
btnEl.addEventListener("click", () => {
  createPassword();
  updateStrength();
});

// Copy Password Icon Click
copyIconEl.addEventListener("click", () => {
  copyPassword();
  if (inputEl.value) {
    alertContainerEl.classList.remove("active");
    setTimeout(() => {
      alertContainerEl.classList.add("active");
    }, 2000);
  }
});

// Function to Generate Password
function createPassword() {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = uppercaseEl.checked ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  const numbers = numbersEl.checked ? "0123456789" : "";
  const symbols = symbolsEl.checked ? "!@#$%^&*()_+?:{}[]" : "";

  const chars = lower + upper + numbers + symbols;
  const length = parseInt(lengthEl.value, 10) || 14;

  if (!chars) {
    inputEl.value = "Select at least one option!";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    password += chars[randomNum];
  }

  inputEl.value = password;
  alertContainerEl.innerText = password + " copied!";
}

// Function to Copy Password
function copyPassword() {
  inputEl.select();
  inputEl.setSelectionRange(0, 9999);
  navigator.clipboard.writeText(inputEl.value);
}

// Function to Update Strength Indicator
function updateStrength() {
  const length = parseInt(lengthEl.value, 10);
  const hasUppercase = uppercaseEl.checked;
  const hasNumbers = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;

  let strength = 0;
  if (length >= 8) strength++;
  if (length >= 12) strength++;
  if (hasUppercase) strength++;
  if (hasNumbers) strength++;
  if (hasSymbols) strength++;

  if (strength <= 2) {
    strengthEl.innerText = "Weak";
    strengthEl.style.color = "red";
  } else if (strength <= 4) {
    strengthEl.innerText = "Medium";
    strengthEl.style.color = "orange";
  } else {
    strengthEl.innerText = "Strong";
    strengthEl.style.color = "green";
  }
}
