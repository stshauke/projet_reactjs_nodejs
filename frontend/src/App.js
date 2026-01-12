// // App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import GestionCours from "./GestionCours";
import Register from "./Register";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GestionCours />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;










//Ancien fichier 
// import React, { useEffect, useState } from "react";

// import Login from "./Login";
// import ProtectedRoute from "./ProtectedRoute";


// function App() {
//   // -------------------------------
//   // Fonction pour gérer les dates dee création des cours
//   // -------------------------------
//   const formatDate = (dateString) => {
//     if (!dateString) return "";

//     const date = new Date(dateString);
//     return date.toLocaleDateString("fr-FR", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // -------------------------------
//   // États globaux pour la gestion des cours
//   // -------------------------------
//   const [cours, setCours] = useState([]);            // Liste des cours
//   const [loading, setLoading] = useState(false);     // Indique si on charge des données
//   const [erreur, setErreur] = useState(null);        // Stocke une erreur éventuelle
//   const [search, setSearch] = useState("");          // Texte de recherche

//   // -------------------------------
//   // États pour la pagination
//   // -------------------------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);


//   // -------------------------------
//   // États pour l'ajout de cours
//   // -------------------------------
//   const [newTitre, setNewTitre] = useState("");
//   const [newDescription, setNewDescription] = useState("");

//   // -------------------------------
//   // États pour l'édition d'un cours
//   // -------------------------------
//   const [editingCours, setEditingCours] = useState(null);   // Contient le cours sélectionné
//   const [editTitre, setEditTitre] = useState("");
//   const [editDescription, setEditDescription] = useState("");

//   // --------------------------------------------------------
//   // Fonction pour récupérer les cours depuis le backend
//   // Reçoit un paramètre "query" pour la recherche
//   // --------------------------------------------------------
//   const fetchCours = (query = "", page = 1) => {
//     setLoading(true);

//     fetch(`http://localhost:5000/cours?q=${query}&page=${page}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Erreur lors de la récupération des cours");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setCours(data.cours);
//         setCurrentPage(data.page);
//         setTotalPages(data.totalPages);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setErreur(err.message);
//         setLoading(false);
//       });
//   };


//   // --------------------------------------------------------
//   // useEffect → Chargement initial des cours au démarrage
//   // --------------------------------------------------------
//   useEffect(() => {
//     fetchCours();
//   }, []);

//   // --------------------------------------------------------
//   // useEffect → Recherche avec délai (debounce de 300 ms)
//   // Appelé à chaque fois que "search" est modifié
//   // --------------------------------------------------------
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchCours(search);
//     }, 300);

//     return () => clearTimeout(delayDebounce); // Nettoyage du timer
//   }, [search]);

//   // --------------------------------------------------------
//   // Fonction d'ajout d'un cours (POST)
//   // --------------------------------------------------------
//   const handleAddCours = (e) => {
//     e.preventDefault();

//     const titreTrim = newTitre.trim();
//     const descriptionTrim = newDescription.trim();

//     if (!titreTrim || !descriptionTrim) {
//       setErreur("Veuillez remplir tous les champs correctement");
//       return;
//     }

//     fetch("http://localhost:5000/cours", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         titre: titreTrim,
//         description: descriptionTrim
//       }),
//     }).then((res) => {
//       if (!res.ok) {
//         throw new Error("Erreur serveur lors de l'ajout");
//       }
//       return res.json();
//     })
//       .then((data) => {
//         // Ajoute le nouveau cours à la liste actuelle
//         setCours([...cours, data]);

//         // Réinitialise le formulaire
//         setNewTitre("");
//         setNewDescription("");

//         // Ferme la modale
//         closeModal('addModal');
//       })
//       .catch((err) => {
//         console.error("Erreur frontend :", err);
//         setErreur("Erreur lors de l'ajout du cours");
//       });
//   };

//   // --------------------------------------------------------
//   // Prépare les données pour l'édition et ouvre la modale
//   // --------------------------------------------------------
//   const handleEdit = (cours) => {
//     setEditingCours(cours); // Stocke le cours en cours d'édition
//     setEditTitre(cours.titre);
//     setEditDescription(cours.description);

//     openModal('editModal'); // Ouvre la modale Bootstrap
//   };

//   // --------------------------------------------------------
//   // Mettre à jour (modifier) un cours
//   // --------------------------------------------------------
//   const handleUpdateCours = (e) => {
//     e.preventDefault();

//     fetch(`http://localhost:5000/cours/${editingCours.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         titre: editTitre,
//         description: editDescription
//       }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Erreur serveur lors de la modification");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         // Met à jour la liste locale des cours
//         setCours(cours.map(c =>
//           c.id === editingCours.id ? { ...c, titre: editTitre, description: editDescription } : c
//         ));

//         // Réinitialise les champs et ferme la modale
//         setEditingCours(null);
//         setEditTitre("");
//         setEditDescription("");
//         closeModal('editModal');
//       })
//       .catch((err) => {
//         console.error("Erreur modification :", err);
//         setErreur("Erreur lors de la modification du cours");
//       });
//   };

//   // --------------------------------------------------------
//   // Supprimer un cours
//   // --------------------------------------------------------
//   const handleDelete = (coursId) => {
//     if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
//       fetch(`http://localhost:5000/cours/${coursId}`, {
//         method: "DELETE",
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("Erreur lors de la suppression");
//           }
//           return res.json();
//         })
//         .then(() => {
//           // Retire le cours de la liste locale
//           setCours(cours.filter(c => c.id !== coursId));
//         })
//         .catch((err) => {
//           console.error("Erreur suppression :", err);
//           setErreur("Erreur lors de la suppression du cours");
//         });
//     }
//   };

//   // --------------------------------------------------------
//   // Voir les détails d'un cours (simple alert)
//   // --------------------------------------------------------
//   const handleView = (cours) => {
//     alert(`Détails du cours:\nTitre: ${cours.titre}\nDescription: ${cours.description}`);
//   };

//   // --------------------------------------------------------
//   // Fonctions utilitaires : ouverture/fermeture des modales Bootstrap
//   // --------------------------------------------------------
//   const closeModal = (modalId) => {
//     const modalEl = document.getElementById(modalId);
//     if (modalEl) {
//       const bootstrap = require('bootstrap');
//       const modal = bootstrap.Modal.getInstance(modalEl);
//       if (modal) modal.hide();
//     }
//   };

//   const openModal = (modalId) => {
//     const modalEl = document.getElementById(modalId);
//     if (modalEl) {
//       const bootstrap = require('bootstrap');
//       const modal = new bootstrap.Modal(modalEl);
//       modal.show();
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center mb-4">📚 Gestion des cours</h1>

//       {/* --------------------------------------------------------
//           Barre de recherche + bouton d'ajout
//       ---------------------------------------------------------*/}
//       <div className="mb-4 d-flex justify-content-between">
//         <input
//           type="text"
//           className="form-control w-75"
//           placeholder="Rechercher un cours..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button
//           className="btn btn-success ms-2"
//           data-bs-toggle="modal"
//           data-bs-target="#addModal"
//         >
//           ➕ Ajouter un cours
//         </button>
//       </div>

//       {/* Messages d'état */}
//       {loading && <div className="alert alert-info">Chargement...</div>}
//       {erreur && <div className="alert alert-danger">{erreur}</div>}

//       {/* --------------------------------------------------------
//           Liste des cours affichée en cartes Bootstrap
//       ---------------------------------------------------------*/}
//       <div className="row">
//         {cours.length === 0 ? (
//           <div className="col-12">
//             <p className="text-muted text-center">Aucun cours trouvé</p>
//           </div>
//         ) : (
//           cours.map((c) => (
//             <div key={c.id} className="col-md-4 mb-4">
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{c.titre}</h5>
//                   <p className="text-muted small">
//                     📅 Ajouté le : {formatDate(c.date_creation)}
//                   </p>
//                   <p className="card-text flex-grow-1">{c.description}</p>

//                   {/* Boutons d'actions */}
//                   <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
//                     <button
//                       className="btn btn-outline-primary btn-sm"
//                       onClick={() => handleView(c)}
//                       title="Voir les détails"
//                     >
//                       <i className="bi bi-eye"></i>
//                     </button>

//                     <button
//                       className="btn btn-outline-warning btn-sm"
//                       onClick={() => handleEdit(c)}
//                       title="Éditer le cours"
//                     >
//                       <i className="bi bi-pencil"></i>
//                     </button>

//                     <button
//                       className="btn btn-outline-danger btn-sm"
//                       onClick={() => handleDelete(c.id)}
//                       title="Supprimer le cours"
//                     >
//                       <i className="bi bi-trash"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <nav className="d-flex justify-content-center mt-4">
//         <ul className="pagination">

//           {/* Bouton Précédent */}
//           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//             <button
//               className="page-link"
//               onClick={() => fetchCours(search, currentPage - 1)}
//             >
//               Précédent
//             </button>
//           </li>

//           {/* Pages */}
//           {[...Array(totalPages)].map((_, index) => (
//             <li
//               key={index}
//               className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => fetchCours(search, index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}

//           {/* Bouton Suivant */}
//           <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//             <button
//               className="page-link"
//               onClick={() => fetchCours(search, currentPage + 1)}
//             >
//               Suivant
//             </button>
//           </li>

//         </ul>
//       </nav>



//       {/* --------------------------------------------------------
//           Modal : Ajouter un cours
//       ---------------------------------------------------------*/}
//       <div className="modal fade" id="addModal" tabIndex="-1">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <form onSubmit={handleAddCours}>
//               <div className="modal-header">
//                 <h5 className="modal-title">Ajouter un cours</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Titre</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={newTitre}
//                     onChange={(e) => setNewTitre(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Description</label>
//                   <textarea
//                     className="form-control"
//                     rows="3"
//                     value={newDescription}
//                     onChange={(e) => setNewDescription(e.target.value)}
//                     required
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                   Annuler
//                 </button>
//                 <button type="submit" className="btn btn-success">
//                   Ajouter
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* --------------------------------------------------------
//           Modal : Modifier un cours
//       ---------------------------------------------------------*/}
//       <div className="modal fade" id="editModal" tabIndex="-1">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <form onSubmit={handleUpdateCours}>
//               <div className="modal-header">
//                 <h5 className="modal-title">Modifier le cours</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Titre</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={editTitre}
//                     onChange={(e) => setEditTitre(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Description</label>
//                   <textarea
//                     className="form-control"
//                     rows="3"
//                     value={editDescription}
//                     onChange={(e) => setEditDescription(e.target.value)}
//                     required
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                   Annuler
//                 </button>
//                 <button type="submit" className="btn btn-warning">
//                   Modifier
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
