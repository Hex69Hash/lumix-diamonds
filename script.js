let selectedPackage = "";
let selectedAmount = "";
let paid = false;

const userIdInput = document.getElementById("userId");
const zoneIdInput = document.getElementById("zoneId");
const upiBtn = document.querySelector(".upi-btn");
const telegramBtn = document.querySelector(".telegram-btn");
const idStatus = document.getElementById("idStatus");

/* ===== ID FORMAT CHECK ===== */
function isValidMLBBId(uid, zid) {
  const uidPattern = /^[0-9]{6,12}$/;
  const zidPattern = /^[0-9]{3,6}$/;
  return uidPattern.test(uid) && zidPattern.test(zid);
}

/* ===== VALIDATION ===== */
function checkReadyForPayment() {
  const uid = userIdInput.value.trim();
  const zid = zoneIdInput.value.trim();

  if (!uid || !zid) {
    idStatus.innerText = "Enter User ID and Zone ID";
    idStatus.style.color = "#6b7280";
    upiBtn.disabled = true;
    return;
  }

  if (!isValidMLBBId(uid, zid)) {
    idStatus.innerText = "Invalid MLBB ID format";
    idStatus.style.color = "red";
    upiBtn.disabled = true;
    return;
  }

  idStatus.innerText = "ID format looks valid ✓";
  idStatus.style.color = "green";

  if (selectedPackage !== "") {
    upiBtn.disabled = false;
  }
}

/* ===== PACKAGE ===== */
function selectPackage(name, details, price) {
  selectedPackage = `${name} | ${details} | ${price}`;
  selectedAmount = Number(price.replace(/[₹,]/g, ""));

  document.getElementById("selected").innerText =
    "Selected Package: " + selectedPackage;

  paid = false;
  telegramBtn.disabled = true;

  checkReadyForPayment();
}

/* ===== INPUT LISTENERS ===== */
userIdInput.addEventListener("input", checkReadyForPayment);
zoneIdInput.addEventListener("input", checkReadyForPayment);

/* ===== UPI ===== */
function openUPI() {
  if (!selectedPackage || !selectedAmount) {
    alert("Please select a package first");
    return;
  }

  document.getElementById("payAmountText").innerText =
    "Amount to Pay: ₹" + selectedAmount.toFixed(2);

  const upiLink = `upi://pay?pa=lumixdiamonds@upi&pn=Lumix%20Diamonds&am=${selectedAmount}&cu=INR`;

  document.getElementById("gpayLink").href = upiLink;
  document.getElementById("phonepeLink").href = upiLink;
  document.getElementById("paytmLink").href = upiLink;

  document.getElementById("upiModal").style.display = "block";
}

/* ===== PAYMENT CONFIRM ===== */
function markPaid() {
  paid = true;

  const tick = document.getElementById("successTick");
  tick.classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("upiModal").style.display = "none";
    tick.classList.add("hidden");
  }, 1200);

  telegramBtn.disabled = false;
}

/* ===== TELEGRAM ===== */
function sendToTelegram() {
  if (!paid) {
    alert("Please complete payment first");
    return;
  }

  const msg = `Hello Lumix Diamonds 👋

User ID: ${userIdInput.value.trim()}
Zone ID: ${zoneIdInput.value.trim()}
Package: ${selectedPackage}
Amount: ₹${selectedAmount}

Payment completed. Screenshot attached.`;

  window.open(
    "https://t.me/lumix_support?text=" + encodeURIComponent(msg),
    "_blank"
  );
}
