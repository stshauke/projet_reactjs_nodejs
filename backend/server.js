// on  importe le module express qui permet de créer facilement un server web en node.js
const express = require("express"); 

// on immporte le module mysql2 qui permet de se connecter et d'intéragir avec une base de données mysql 
const mysql = require("mysql2"); 

// on importe le module corse qui gère la sécurité entre le frontend (React.js) et le backend(node.js)
// CORS c'est cross-origine resource shering 
const cors = require("cors"); 

// on initialise notre application express
const app = express();

// activer cors pour toutes les routes 
app.use(cors());

// comprendre le format json
app.use(express.json());

// connection à la base de donnnées
const db = mysql.createConnection(
    {
    host: "localhost", 
    user: "root",
    password: "",
    database: "gestion_cours"
    }
)


// recherche des cours
app.get("/cours", (req, res) => {
  // On récupère la valeur du paramètre dans l'URL (/cours?q=react), si rien n’est fourni → chaîne vide
  const search = req.query.q || "";

  const sql = "SELECT * FROM cours WHERE titre LIKE ?";
  db.query(sql, [`%${search}%`], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des cours :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
});

// Ajouter un cours
app.post("/cours", (req, res) => {
  const { titre, description } = req.body;

  if (!titre || !description) {
    return res.status(400).json({ error: "Titre et description requis" });
  }

  const sql = "INSERT INTO cours (titre, description) VALUES (?, ?)";
  db.query(sql, [titre, description], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du cours :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    const newCours = { id: result.insertId, titre, description };
    console.log("Cours ajouté avec succès :", newCours);

    return res.status(201).json(newCours); // réponse claire et valide
  });
});


// Route PUT pour modifier un cours
app.put("/cours/:id", (req, res) => {
  const { id } = req.params;
  const { titre, description } = req.body;

  // Validation des données
  if (!titre || !description) {
    return res.status(400).json({ error: "Le titre et la description sont requis" });
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const sql = "UPDATE cours SET titre = ?, description = ? WHERE id = ?";
  
  db.query(sql, [titre, description, id], (err, result) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ error: "Erreur serveur lors de la mise à jour" });
    }

    // Vérifier si une ligne a été modifiée
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cours non trouvé" });
    }

    res.json({ 
      message: "Cours mis à jour avec succès",
      id: parseInt(id),
      titre,
      description
    });
  });
});

// Route DELETE pour supprimer un cours
app.delete("/cours/:id", (req, res) => {
  const { id } = req.params;

  // Validation de l'ID
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const sql = "DELETE FROM cours WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ error: "Erreur serveur lors de la suppression" });
    }

    // Vérifier si une ligne a été supprimée
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cours non trouvé" });
    }

    res.json({ 
      message: "Cours supprimé avec succès",
      id: parseInt(id)
    });
  });
});







// l'url de demarrage du 
app.listen(5000, ()=>{
     console.log("Serveur démarré sur http://localhost:5000");
});

