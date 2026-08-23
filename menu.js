// 🔥 MENU DATA
const MENU_ITEMS = [
{name:"🏠 Home", link:"home.html"},
{name:"👤 Profile", link:"profile.html"},
{name:"💳 UPI Details", link:"deposit.html"},
{name:"🏦 Bank Details", link:"withdraw.html"},
{name:"📜 History", link:"userhistory.html"},

{name:"📊 Result", link:"market.html"}, // ✅ LOCAL PAGE

{name:"💰 Winning", link:"userwining.html"},
{name:"📊 Game Rates", link:"#"},
{name:"📄 Terms", link:"terms.html"},
{name:"🚪 Logout", link:"logout"}
];

// 🔥 MENU + OVERLAY CREATE
document.body.insertAdjacentHTML("beforeend", `
<div id="sideMenu" style="
position:fixed;
top:0;
left:-100%;
width:80%;
height:100%;
background:#fff;
z-index:9999;
padding:15px;
transition:0.3s;
border-top-right-radius:20px;
border-bottom-right-radius:20px;
overflow:auto;
">
<h2 style="margin-bottom:15px;">Menu</h2>
<div id="menuItems"></div>
</div>

<div id="overlay" onclick="closeMenu()" style="
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.5);
display:none;
z-index:9998;
"></div>
`);

// 🔥 MENU ITEMS LOAD
let html = "";
MENU_ITEMS.forEach(item=>{
html += `
<div style="
padding:15px;
margin-top:10px;
background:#f2f2f2;
border-radius:12px;
font-weight:bold;
cursor:pointer;
" onclick="handleMenu('${item.link}')">
${item.name}
</div>
`;
});

document.getElementById("menuItems").innerHTML = html;

// 🔥 FUNCTIONS
function openMenu(){
document.getElementById("sideMenu").style.left = "0";
document.getElementById("overlay").style.display = "block";
}

function closeMenu(){
document.getElementById("sideMenu").style.left = "-100%";
document.getElementById("overlay").style.display = "none";
}

function handleMenu(link){

// ✅ Game Rates popup
if(link === "#"){
alert("RATE LIST:-*\n\n• जोड़ी रेट: 1 ke 90, 10 ke 950\n\n• हर्फ़ रेट: 10 ke 90, 100 ke 950");
return;
}

// logout
if(link === "logout"){
localStorage.removeItem("user");
window.location.href = "index.html";
} else {
window.location.href = link;
}
}
