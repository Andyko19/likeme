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

module.exports = { obtenerPosts, agregarPost };
