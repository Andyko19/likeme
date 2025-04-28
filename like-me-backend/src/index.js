const express = require("express");
const cors = require("cors");
const {
  obtenerPosts,
  agregarPost,
  aumentarLikes,
  eliminarPost,
} = require("./consultas");

const app = express();
app.use(cors());
app.use(express.json());

// GET posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST nuevo post
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;
    await agregarPost(titulo, img, descripcion, likes);
    res.send("Post agregado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT aumentar likes
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postActualizado = await aumentarLikes(id);
    res.json(postActualizado);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE eliminar un post
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postEliminado = await eliminarPost(id);
    res.json(postEliminado);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Escuchar servidor
app.listen(3000, () => console.log("Servidor encendido en puerto 3000"));
