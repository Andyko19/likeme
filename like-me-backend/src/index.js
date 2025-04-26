// src/index.js
const express = require("express");
const cors = require("cors");
const { obtenerPosts, agregarPost } = require("./consultas");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  const posts = await obtenerPosts();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  await agregarPost(titulo, img, descripcion, likes);
  res.send("Post agregado con éxito");
});

app.listen(3000, () => console.log("Servidor encendido en puerto 3000"));
