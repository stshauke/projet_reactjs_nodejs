// App.js
import React, { useEffect, useState } from "react";

function App() {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [search, setSearch] = useState("");

  // États pour l'ajout
  const [newTitre, setNewTitre] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // États pour l'édition
  const [editingCours, setEditingCours] = useState(null);
  const [editTitre, setEditTitre] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Fonction pour charger les cours
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

  // Recherche
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCours(search);
    }, 300); 
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // AJOUTER un cours
  const handleAddCours = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/cours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titre: newTitre, description: newDescription }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur lors de l'ajout");
        }
        return res.json();
      })
      .then((data) => {
        setCours([...cours, data]);
        setNewTitre("");
        setNewDescription("");
        closeModal('addModal');
      })
      .catch((err) => {
        console.error("Erreur frontend :", err);
        setErreur("Erreur lors de l'ajout du cours");
      });
  };

  // ÉDITER un cours
  const handleEdit = (cours) => {
    setEditingCours(cours);
    setEditTitre(cours.titre);
    setEditDescription(cours.description);
    // Ouvrir la modale d'édition
    openModal('editModal');
  };

  const handleUpdateCours = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/cours/${editingCours.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        titre: editTitre, 
        description: editDescription 
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur lors de la modification");
        }
        return res.json();
      })
      .then((data) => {
        // Mettre à jour la liste locale
        setCours(cours.map(c => 
          c.id === editingCours.id ? { ...c, titre: editTitre, description: editDescription } : c
        ));
        setEditingCours(null);
        setEditTitre("");
        setEditDescription("");
        closeModal('editModal');
      })
      .catch((err) => {
        console.error("Erreur modification :", err);
        setErreur("Erreur lors de la modification du cours");
      });
  };

  // SUPPRIMER un cours
  const handleDelete = (coursId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      fetch(`http://localhost:5000/cours/${coursId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erreur lors de la suppression");
          }
          return res.json();
        })
        .then(() => {
          // Supprimer le cours de la liste locale
          setCours(cours.filter(c => c.id !== coursId));
        })
        .catch((err) => {
          console.error("Erreur suppression :", err);
          setErreur("Erreur lors de la suppression du cours");
        });
    }
  };

  // VOIR les détails
  const handleView = (cours) => {
    alert(`Détails du cours:\nTitre: ${cours.titre}\nDescription: ${cours.description}`);
  };

  // Fonctions utilitaires pour les modales
  const closeModal = (modalId) => {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const bootstrap = require('bootstrap');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
      }
    }
  };

  const openModal = (modalId) => {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const bootstrap = require('bootstrap');
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📚 Gestion des cours</h1>

      {/* Barre de recherche et bouton ajouter */}
      <div className="mb-4 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Rechercher un cours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-success ms-2"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          ➕ Ajouter un cours
        </button>
      </div>

      {/* Messages */}
      {loading && <div className="alert alert-info">Chargement...</div>}
      {erreur && <div className="alert alert-danger">{erreur}</div>}

      {/* Liste des cours */}
      <div className="row">
        {cours.length === 0 ? (
          <div className="col-12">
            <p className="text-muted text-center">Aucun cours trouvé</p>
          </div>
        ) : (
          cours.map((c) => (
            <div key={c.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{c.titre}</h5>
                  <p className="card-text flex-grow-1">{c.description}</p>
                  
                  {/* Actions */}
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleView(c)}
                      title="Voir les détails"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    
                    <button 
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => handleEdit(c)}
                      title="Éditer le cours"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(c.id)}
                      title="Supprimer le cours"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Ajouter */}
      <div className="modal fade" id="addModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleAddCours}>
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un cours</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newTitre}
                    onChange={(e) => setNewTitre(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Annuler
                </button>
                <button type="submit" className="btn btn-success">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Éditer */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleUpdateCours}>
              <div className="modal-header">
                <h5 className="modal-title">Modifier le cours</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editTitre}
                    onChange={(e) => setEditTitre(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Annuler
                </button>
                <button type="submit" className="btn btn-warning">
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;