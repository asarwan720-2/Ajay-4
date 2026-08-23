<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Game</title>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="header.js"></script>

<style>
body {
    font-family: Arial;
    background: #f2f2f2;
    margin: 0;
}

/* 🔥 HEADER (NEW SYSTEM) */
.header{
  position:fixed;
  top:10px;
  left:10px;
  right:10px;
  background:#fff;
  border-radius:20px;
  padding:10px 15px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  box-shadow:0 4px 10px rgba(0,0,0,0.1);
  z-index:999;
}

#menuBtn{
  font-size:22px;
}

#userId{
  background:green;
  color:white;
  padding:6px 12px;
  border-radius:20px;
  font-weight:bold;
  font-size:12px;
}

#wallet{
  background:red;
  color:white;
  padding:6px 12px;
  border-radius:20px;
  font-weight:bold;
  font-size:12px;
}

/* TOP BUTTONS */
.topBtns{
  margin-top:80px;
  display:flex;
  justify-content:space-around;
  padding:10px;
}

.topBtn{
  width:22%;
  padding:10px;
  border-radius:20px;
  text-align:center;
  color:white;
  font-weight:bold;
  font-size:12px;
  cursor:pointer;
}

.btn1{background:#6c5ce7;}
.btn2{background:#00b894;}
.btn3{background:#0984e3;}
.btn4{background:#e17055;}

.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    padding: 12px;
    padding-bottom: 80px;
}

.box {
    background: white;
    border-radius: 12px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.number {
    color: red;
    font-weight: bold;
    margin-bottom: 5px;
}

.box input {
    width: 90%;
    height: 35px;
    border-radius: 8px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 16px;
}

.bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
}

.total {
    width: 50%;
    padding: 15px;
    text-align: center;
    background: linear-gradient(to right, blue, red);
    color: white;
    font-size: 18px;
}

.submit {
    width: 50%;
    padding: 15px;
    text-align: center;
    background: green;
    color: white;
    font-size: 18px;
}

/* WHATSAPP */
.whatsapp{
  position:fixed;
  bottom:80px;
  right:15px;
  width:45px;
  height:45px;
  background:#25D366;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-size:22px;
  z-index:999;
}
</style>
</head>

<body>

<!-- HEADER -->
<div class="header">
  <div id="menuBtn">≡</div>
  <div id="userId">ID: 0000</div>
  <div id="wallet">₹ 0</div>
</div>

<!-- TOP BUTTONS -->
<div class="topBtns">
  <div class="topBtn btn1" onclick="goRates()">JODI</div>
  <div class="topBtn btn2" onclick="goChart()">HARUF</div>
  <div class="topBtn btn3" onclick="goHistory()">CROSSING</div>
  <div class="topBtn btn4" onclick="goWin()">COPY PASTE</div>
</div>

<div class="container" id="grid"></div>

<a class="whatsapp" href="https://wa.me/" target="_blank">💬</a>

<div class="bottom">
    <div class="total" id="total">₹ 0</div>
    <div class="submit" onclick="submitGame()">SUBMIT</div>
</div>

<script>

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
  window.location.href = "index.html";
}

const client = supabase.createClient(
  "https://katbdbzoufiblnnsoxkk.supabase.co",
  "sb_publishable_--fdpQMmSlUyt2ywjUErgQ_LXGvQH-a"
);

// 🔥 MARKET NAME (change per page)
const market = "JODI";

// WALLET
async function loadWallet(){
  const { data } = await client
    .from("login")
    .select("balance")
    .eq("id", user.id)
    .single();

  if(data){
    document.getElementById("wallet").innerText = "₹ " + data.balance;
    document.getElementById("userId").innerText = "ID: " + user.id;
  }
}

// LINKS
function goRates(){ window.location.href = "game.html"; }
function goChart(){ window.location.href = "harf.html"; }
function goHistory(){ window.location.href = "crossing.html"; }
function goWin(){ window.location.href = "copypast.html"; }

// CREATE BOXES
let grid = document.getElementById("grid");

for (let i = 0; i < 100; i++) {
    let num = i.toString().padStart(2, '0');

    let div = document.createElement("div");
    div.className = "box";

    div.innerHTML = `
        <div class="number">${num}</div>
        <input type="number" placeholder="₹" oninput="calcTotal()">
    `;

    grid.appendChild(div);
}

// TOTAL
function calcTotal() {
    let inputs = document.querySelectorAll("input");
    let total = 0;

    inputs.forEach(inp => {
        total += Number(inp.value) || 0;
    });

    document.getElementById("total").innerText = "₹ " + total;
}

// SUBMIT + HISTORY SAVE
async function submitGame(){
    let inputs = document.querySelectorAll("input");
    let total = 0;
    let dataArr = [];

    inputs.forEach((inp, i) => {
        let val = Number(inp.value) || 0;
        total += val;

        if(val > 0){
          dataArr.push({
            number: i.toString().padStart(2,'0'),
            amount: val
          });
        }
    });

    if(total <= 0){
        alert("Amount dalo");
        return;
    }

    const { data } = await client
        .from("login")
        .select("balance")
        .eq("id", user.id)
        .single();

    if(data.balance < total){
        alert("Insufficient balance");
        return;
    }

    // 🔥 balance cut
    await client
        .from("login")
        .update({ balance: data.balance - total })
        .eq("id", user.id);

    // 🔥 history save
    await client
        .from("history")
        .insert([{
            user_id: user.id,
            market: market,
            data: JSON.stringify(dataArr),
            total: total
        }]);

    inputs.forEach(inp => inp.value = "");

    calcTotal();
    loadWallet();

    alert("Game Submitted");
}

loadWallet();

</script>

</body>
</html>
