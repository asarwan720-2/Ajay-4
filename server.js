const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 IMPORTANT
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server Running ✅");
});

// 🔥 UPDATE BALANCE
let users = {
    "ajay": 1
};

app.post("/update-balance", (req, res) => {
    const { user, total } = req.body;

 if (users[user] === undefined) {
  users[user] = 1; // auto create user with ₹1
}

    if (users[user] < total) {
    return res.json({ success: false, message: "Low balance" });
}

    users[user] -= total;

    res.json({
        success: true,
        balance: users[user]
    });
});
app.post("/get-user", (req, res) => {
  const { user } = req.body;

  if (users[user] === undefined) {
    users[user] = 1; // new user = ₹1
  }

  res.json({ balance: users[user] });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
