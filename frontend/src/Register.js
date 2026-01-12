import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError(null);

    if (!nom.trim() || !email.trim() || !password.trim()) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom,
        email,
        password,
        role: "lecteur" // 🔒 rôle imposé
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        navigate("/login");
      })
      .catch(() => {
        setError("Erreur lors de l'inscription");
      });
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold">Créer un compte</h2>
          <p className="text-muted">Inscription lecteur</p>
        </div>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              className="form-control"
              placeholder="Votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="btn btn-primary w-100 mt-2">
            📝 S’inscrire
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-decoration-none">
              Se connecter
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Register;
