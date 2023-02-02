const express = require("express");
const itemRoutes = require('./routes/item.routes')
require('./database-mongo');
const app = express();
const PORT = process.env.PORT || 3000
const cors = require("cors")
const { User, ToWatch, Watched } = require("./database-mongo/Item.model")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));
app.use(cors())
app.get("/user", function (req, res) {
  User.find({ name: req.headers.name }).then((e) => {
    if (e[0].password == req.headers.password) {
      res.send(e)
    } else {
      res.send("Wrong Password")
    }
  }).catch(() => res.send("user not found"))
});

app.post("/user", (req, res) => {
  User.find({ name: req.headers.name }).then((e) => {
    if (!e.length) {
      User.create({ name: req.headers.name, password: req.headers.password })
        .then((e) => res.send(e)).catch((err) => res.send(err))
    }
    else { res.send("user already exist") }
  }).catch(() => res.send("user not found"))
})

app.patch("/user", (req, res) => {

  if (req.headers.id) {
    User.find({ name: req.headers.name }).then((e) => {
      if (!e.length) {
        if (req.headers.name) {
          User.findByIdAndUpdate(req.headers.id, { name: req.headers.name, password: req.headers.password })
            .then((e) => res.send(e)).catch((err) => res.send(err))
        }
        else {
          User.findByIdAndUpdate(req.headers.id, { password: req.headers.password })
            .then((e) => res.send(e)).catch((err) => res.send(err))
        }
      }
      else { res.send("user already exist") }
    }).catch(() => res.send("user not found"))
  }
})
app.delete('/api/prefrences', (req, res) => {
  if (req.body.type === "watched") {
    Watched.findByIdAndDelete(req.body.id).then((e) => console.log(e)).catch((err) => console.log(err))
  } else {
    ToWatch.findByIdAndDelete(req.body.id).then((e) => console.log(e)).catch((err) => console.log(err))

  }
  res.send()
})
app.use("/api", (req, res, next) => {
  User.findById(req.headers.userid).then(() => { next() }).catch((e) => res.send(e))
}, itemRoutes);


app.listen(PORT, function () {
  console.log("listening on port 3000!");
});
