import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    img: "",
    descripcion: "",
    likes: 0,
  });

  const obtenerPosts = async () => {
    const res = await axios.get(API);
    setPosts(res.data);
  };

  const agregarPost = async (e) => {
    e.preventDefault();
    await axios.post(API, form);
    setForm({ titulo: "", img: "", descripcion: "", likes: 0 });
    obtenerPosts();
  };

  useEffect(() => {
    obtenerPosts();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Like Me - Conectado al Backend ✅</h1>

      <form onSubmit={agregarPost} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="URL de imagen"
          value={form.img}
          onChange={(e) => setForm({ ...form, img: e.target.value })}
        />
        <br />
        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <br />
        <input
          type="number"
          placeholder="Likes"
          value={form.likes}
          onChange={(e) =>
            setForm({ ...form, likes: parseInt(e.target.value) })
          }
        />
        <br />
        <button type="submit">Publicar</button>
      </form>

      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{post.titulo}</h3>
            <img src={post.img} alt={post.titulo} style={{ width: "200px" }} />
            <p>{post.descripcion}</p>
            <p>❤️ {post.likes} likes</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
