// App.js
import React, { useEffect, useState } from "react";

function App() {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [search, setSearch] = useState("");

  // Fonction pour charger les cours (avec ou sans recherche)
  const fetchCours = (query = "") => {
    setLoading(true);
    fetch(`http://localhost:5000/cours?q=${query}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des cours");
        }
        return res.json();
      })
      .then((data) => {
        setCours(data);
        setLoading(false);
      })
      .catch((err) => {
        setErreur(err.message);
        setLoading(false);
      });
  };

  // Charger tous les cours au démarrage
  useEffect(() => {
    fetchCours();
  }, []);

  // Quand l'utilisateur tape dans la barre de recherche
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCours(search);
    }, 300); // délai pour éviter trop d'appels
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📚 Gestion des cours</h1>

      {/* Zone de recherche */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un cours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Messages d'état */}
      {loading && <p>Chargement...</p>}
      {erreur && <p className="text-danger">{erreur}</p>}

      {/* Grille de cartes Bootstrap */}
      <div className="row">
        {cours.length === 0 ? (
          <p className="text-muted">Aucun cours trouvé</p>
        ) : (
          cours.map((c) => (
            <div key={c.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{c.titre}</h5>
                  <p className="card-text flex-grow-1">{c.description}</p>
                  <a href="#!" className="btn btn-primary mt-auto">
                    Voir plus
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
