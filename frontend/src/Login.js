import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      })
      .catch(() => {
        setError("Email ou mot de passe incorrect");
      });
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "380px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold">Connexion</h2>
          <p className="text-muted">Accès à la gestion des cours</p>
        </div>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 🔗 Liens utiles */}
          <div className="d-flex justify-content-between mb-3">
            <Link to="/forgot-password" className="small text-decoration-none">
              Mot de passe oublié ?
            </Link>

            <Link to="/register" className="small text-decoration-none">
              S’inscrire
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            🔐 Se connecter
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">
            © {new Date().getFullYear()} Gestion des cours
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
