const express = require("express");
const app = express();

const images = require("./files/images").reverse();
const mongoose = require("mongoose");
const cors = require("cors");
require("./Modals/counter");

app.use(cors());
let dbUrl =
  "mongodb+srv://arpitmishra:arpitskaju@cluster0-6m0pr.mongodb.net/test";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(
  express.json({
    urlEncoded: false,
  })
);

app.use(cors());

const VisitorCounter = mongoose.model("Counter");

const port = process.env.PORT || 9000;
app.listen(port, () => console.log("Server is started at port: " + port));

app.get("/", (req, res) => {
  res.send("magzine-backend");
});

app.get("/imageNames", (req, res) => {
  res.json(images);
});

app.get("/thumbnailimage/:id", (req, res) => {
  res.sendFile(__dirname + `/public/images/${images[req.params.id]}`);
});

app.get("/visitorCount", (req, res) => {
  VisitorCounter.find({ name: "magzine" })
    .then((data) => {
      console.log(data);
      res.json(data[0].count);
    })
    .catch((err) => console.log(err));
});

app.post("/visitorCount/:count", (req, res) => {
  const data = req.params.count;
  console.log(data);
  VisitorCounter.updateOne({ name: "magzine" }, { count: data }, () => {
    console.log("updated to " + data);
    res.json(data);
  });
});
