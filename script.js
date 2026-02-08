let selectedPackage = "";

function selectPackage(name, details, price) {
  selectedPackage = `${name} | ${details} | ${price}`;
  document.getElementById("selected").innerText =
    "Selected Package: " + selectedPackage;
}

function sendToTelegram() {
  const userId = document.getElementById("userId").value.trim();
  const zoneId = document.getElementById("zoneId").value.trim();

  if (!userId || !zoneId) {
    alert("Please enter User ID and Zone ID");
    return;
  }

  if (!selectedPackage) {
    alert("Please select a package");
    return;
  }

  const message = `Hello Lumix Diamonds 👋

User ID: ${userId}
Zone ID: ${zoneId}
Package: ${selectedPackage}

I have completed the payment. Screenshot attached.`;

  const telegramUsername = "LumixSupport"; // CHANGE THIS
  window.open(
    `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}
