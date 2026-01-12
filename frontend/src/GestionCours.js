import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function GestionCours() {
    const user = JSON.parse(localStorage.getItem("user"));

    // -------------------------------
    // Format date
    // -------------------------------
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // -------------------------------
    // States
    // -------------------------------
    const [cours, setCours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erreur, setErreur] = useState(null);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [newTitre, setNewTitre] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const [editingCours, setEditingCours] = useState(null);
    const [editTitre, setEditTitre] = useState("");
    const [editDescription, setEditDescription] = useState("");


    const handleView = (cours) => {
        alert(
            `Détails du cours :\n\nTitre : ${cours.titre}\n\nDescription : ${cours.description}`
        );
    };

    //Gestion des déconnexions
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };



    // -------------------------------
    // Fetch cours
    // -------------------------------
    const fetchCours = (query = "", page = 1) => {
        setLoading(true);
        fetch(`http://localhost:5000/cours?q=${query}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setCours(data.cours);
                setCurrentPage(data.page);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch(() => {
                setErreur("Erreur chargement cours");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCours("", 1);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => fetchCours(search, 1), 300);
        return () => clearTimeout(t);
    }, [search]);

    // -------------------------------
    // AJOUT (VALIDATION COMME AVANT)
    // -------------------------------
    const handleAddCours = (e) => {
        e.preventDefault();

        const titreTrim = newTitre.trim();
        const descriptionTrim = newDescription.trim();

        if (!titreTrim || !descriptionTrim) {
            setErreur("Veuillez remplir tous les champs correctement");
            return;
        }

        fetch("http://localhost:5000/cours", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                titre: titreTrim,
                description: descriptionTrim
            }),
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                setCours([...cours, data]);
                setNewTitre("");
                setNewDescription("");
                setErreur(null);
            })
            .catch(() => setErreur("Erreur lors de l'ajout"));
    };

    // -------------------------------
    // EDIT
    // -------------------------------
    const handleEdit = (c) => {
        setEditingCours(c);
        setEditTitre(c.titre);
        setEditDescription(c.description);
    };

    const handleUpdateCours = (e) => {
        e.preventDefault();

        const titreTrim = editTitre.trim();
        const descriptionTrim = editDescription.trim();

        if (!titreTrim || !descriptionTrim) {
            setErreur("Veuillez remplir tous les champs correctement");
            return;
        }

        fetch(`http://localhost:5000/cours/${editingCours.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                titre: titreTrim,
                description: descriptionTrim
            }),
        })
            .then(() => {
                setCours(cours.map(c =>
                    c.id === editingCours.id
                        ? { ...c, titre: titreTrim, description: descriptionTrim }
                        : c
                ));
                setEditingCours(null);
                setErreur(null);
            })
            .catch(() => setErreur("Erreur modification"));
    };

    // -------------------------------
    // DELETE
    // -------------------------------
    const handleDelete = (id) => {
        if (!window.confirm("Supprimer ce cours ?")) return;

        fetch(`http://localhost:5000/cours/${id}`, { method: "DELETE" })
            .then(() => setCours(cours.filter(c => c.id !== id)))
            .catch(() => setErreur("Erreur suppression"));
    };

    return (
  <>
    {/* 🔝 NAVBAR */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">
        📚 Gestion des cours
      </span>

      <div className="ms-auto d-flex align-items-center gap-3">
        <span className="text-white">
          👋 Bonjour <strong>{user?.nom}</strong> ({user?.role})
        </span>

        <button
          className="btn btn-outline-light btn-sm"
          onClick={handleLogout}
        >
          🚪 Déconnexion
        </button>
      </div>
    </nav>

    {/* CONTENU */}
    <div className="container mt-4">

        <div className="container mt-4">
            <h1 className="text-center mb-4">📚 Gestion des cours</h1>

            {/* Recherche + Ajouter */}
            <div className="mb-4 d-flex justify-content-between">
                <input
                    className="form-control w-75"
                    placeholder="Rechercher un cours..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {user?.role === "admin" && (
                    <button
                        className="btn btn-success ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#addModal"
                    >
                        ➕ Ajouter un cours
                    </button>
                )}
            </div>

            {loading && <div className="alert alert-info">Chargement...</div>}
            {erreur && <div className="alert alert-danger">{erreur}</div>}

            {/* Cards */}
            <div className="row">
                {cours.map((c) => (
                    <div key={c.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5>{c.titre}</h5>
                                <p className="text-muted small">
                                    📅 Ajouté le : {formatDate(c.date_creation)}
                                </p>
                                <p className="flex-grow-1">{c.description}</p>

                                <div className="d-flex justify-content-end gap-2 mt-auto pt-3">

                                    {/* 👁 Voir → tout le monde */}
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handleView(c)}
                                        title="Voir les détails"
                                    >
                                        <i className="bi bi-eye"></i>
                                    </button>

                                    {/* ✏ Modifier → admin seulement */}
                                    {user?.role === "admin" && (
                                        <button
                                            className="btn btn-outline-warning btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editModal"
                                            onClick={() => handleEdit(c)}
                                            title="Modifier"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                    )}

                                    {/* 🗑 Supprimer → admin seulement */}
                                    {user?.role === "admin" && (
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleDelete(c.id)}
                                            title="Supprimer"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    )}

                                </div>


                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                        <li
                            key={i}
                            className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => fetchCours(search, i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* MODAL AJOUT */}
            <div className="modal fade" id="addModal" tabIndex="-1">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleAddCours}>
                        <div className="modal-header">
                            <h5 className="modal-title">Ajouter un cours</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                className="form-control mb-2"
                                value={newTitre}
                                onChange={(e) => setNewTitre(e.target.value)}
                                placeholder="Titre"
                                required
                            />
                            <textarea
                                className="form-control"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Description"
                                required
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                            >
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* MODAL EDIT */}
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleUpdateCours}>
                        <div className="modal-header">
                            <h5 className="modal-title">Modifier le cours</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                className="form-control mb-2"
                                value={editTitre}
                                onChange={(e) => setEditTitre(e.target.value)}
                                required
                            />
                            <textarea
                                className="form-control"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                            >
                                Modifier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
  </>


    );
}

export default GestionCours;
