let chosenPackage = "";

function selectPackage(name, details, price) {
  chosenPackage = `${name} | ${details} | ${price}`;
  document.getElementById("selected").innerText =
    "Selected Package: " + chosenPackage;
}

function sendToTelegram() {
  const userId = document.getElementById("userId").value;
  const zoneId = document.getElementById("zoneId").value;

  if (!userId || !zoneId) {
    alert("Please enter User ID and Zone ID");
    return;
  }

  if (!chosenPackage) {
    alert("Please select a package");
    return;
  }

  const message = `Hello Lumix Diamonds 👋

User ID: ${userId}
Zone ID: ${zoneId}
Package: ${chosenPackage}

I have completed the payment. Screenshot attached.`;

  const telegramUsername = "LumixSupport"; // CHANGE THIS
  window.open(
    "https://t.me/" +
      telegramUsername +
      "?text=" +
      encodeURIComponent(message),
    "_blank"
  );
}
