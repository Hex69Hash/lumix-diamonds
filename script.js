let selectedPackage="";

function selectPackage(name,details,price){
selectedPackage=`${name} | ${details} | ${price}`;
document.getElementById("selected").innerText="Selected Package: "+selectedPackage;
}

function sendToTelegram(){
const uid=document.getElementById("userId").value.trim();
const zid=document.getElementById("zoneId").value.trim();
if(!uid||!zid||!selectedPackage){alert("Fill details & select package");return;}
const msg=`Hello Lumix Diamonds 👋

User ID: ${uid}
Zone ID: ${zid}
Package: ${selectedPackage}

Payment done. Screenshot attached.`;

window.open("https://t.me/LumixSupport?text="+encodeURIComponent(msg),"_blank");
}
