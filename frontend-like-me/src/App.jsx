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

  const darLike = async (id) => {
    await axios.put(`${API}/like/${id}`);
    obtenerPosts();
  };

  const eliminarPost = async (id) => {
    await axios.delete(`${API}/${id}`);
    obtenerPosts();
  };

  useEffect(() => {
    obtenerPosts();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary">Like Me - AG</h1>

      <form onSubmit={agregarPost} className="card card-body mb-5 shadow-sm">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="URL de imagen"
            value={form.img}
            onChange={(e) => setForm({ ...form, img: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Likes"
            value={form.likes}
            onChange={(e) =>
              setForm({ ...form, likes: parseInt(e.target.value) })
            }
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Publicar
        </button>
      </form>

      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={post.img}
                className="card-img-top"
                alt={post.titulo}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.titulo}</h5>
                <p className="card-text">{post.descripcion}</p>
                <p className="text-primary">❤️ {post.likes} likes</p>
                <div className="mt-auto">
                  <button
                    onClick={() => darLike(post.id)}
                    className="btn btn-success btn-sm me-2"
                  >
                    Dar Like
                  </button>
                  <button
                    onClick={() => eliminarPost(post.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
