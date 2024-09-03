var express = require("express");
var cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    const file = req.file;
    res.status(200).json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
