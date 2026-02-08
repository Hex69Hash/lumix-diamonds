let selectedPackage = "";
let selectedAmount = "";
let qrOpened = false;
let paid = false;

function selectPackage(name, details, price) {
  selectedPackage = `${name} | ${details} | ${price}`;
  selectedAmount = price.replace("₹", "");
  document.getElementById("selected").innerText =
    "Selected Package: " + selectedPackage;

  paid = false;
  qrOpened = false;
  document.querySelector("button[onclick='sendToTelegram()']").disabled = true;
}

function openUPI() {
  if (!selectedPackage) {
    alert("Please select a package first");
    return;
  }

  qrOpened = true;

  document.getElementById("payAmountText").innerText =
    "Amount: ₹" + selectedAmount;

  // UPI deep links
  const upi = `upi://pay?pa=lumixdiamonds@upi&pn=Lumix%20Diamonds&am=${selectedAmount}&cu=INR`;

  document.getElementById("gpayLink").href = upi;
  document.getElementById("phonepeLink").href = upi;
  document.getElementById("paytmLink").href = upi;

  document.getElementById("upiModal").style.display = "block";
}

function closeUPI() {
  document.getElementById("upiModal").style.display = "none";
}

function markPaid() {
  paid = true;

  const tick = document.getElementById("successTick");
  tick.classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("upiModal").style.display = "none";
    tick.classList.add("hidden");
  }, 1200);

  document.querySelector("button[onclick='sendToTelegram()']").disabled = false;
}

function sendToTelegram() {
  const uid = document.getElementById("userId").value.trim();
  const zid = document.getElementById("zoneId").value.trim();

  if (!uid || !zid || !paid) {
    alert("Please complete payment first");
    return;
  }

  const msg = `Hello Lumix Diamonds 👋

User ID: ${uid}
Zone ID: ${zid}
Package: ${selectedPackage}
Amount: ₹${selectedAmount}

Payment completed. Screenshot attached.`;

  window.open(
    "https://t.me/LumixSupport?text=" + encodeURIComponent(msg),
    "_blank"
  );
}
