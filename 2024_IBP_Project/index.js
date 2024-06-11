const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static('views'));
app.use(express.static('public'));
// Anasayfa
app.get("/", (req, res) => {
    res.render("homepage");
});

// Admin
app.get("/admin", (req, res) => {
    res.render("admin");
});

// User
app.get("/user", (req, res) => {
    res.render("user");
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000");
});
