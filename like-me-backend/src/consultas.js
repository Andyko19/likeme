// src/consultas.js
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Joabandres11",
  database: "likeme",
  allowExitOnIdle: true,
});

// Función GET: obtener todos los posts
const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

// Función POST: agregar un nuevo post
const agregarPost = async (titulo, img, descripcion, likes) => {
  const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes];
  await pool.query(consulta, values);
};

// Función PUT: aumentar los likes de un post
const aumentarLikes = async (id) => {
  const consulta =
    "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

// Función DELETE: eliminar un post
const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

// Exportar las funciones
module.exports = {
  obtenerPosts,
  agregarPost,
  aumentarLikes,
  eliminarPost,
};
