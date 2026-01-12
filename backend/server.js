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


// recherche des cours + pagination
app.get("/cours", (req, res) => {
  const search = req.query.q || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  // Requête principale paginée
  const sql = `
    SELECT id, titre, description, date_creation
    FROM cours
    WHERE titre LIKE ?
    ORDER BY date_creation DESC
    LIMIT ? OFFSET ?
  `;

  // Requête pour compter le total
  const countSql = `
    SELECT COUNT(*) AS total
    FROM cours
    WHERE titre LIKE ?
  `;

  db.query(countSql, [`%${search}%`], (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: "Erreur serveur" });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(sql, [`%${search}%`, limit, offset], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erreur serveur" });
      }

      res.json({
        cours: results,
        page,
        totalPages,
        total
      });
    });
  });
});
//Gestion de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const user = rows[0];

    // Comparaison directe (non sécurisé mais pédagogique)
    if (user.password !== password) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // Retourner l'utilisateur (sans le mot de passe)
    res.json({
      id: user.id,
      nom: user.nom,
      email: user.email,
      role: user.role
    });
  });
});


app.post("/cours", (req, res) => {
  let { titre, description } = req.body;

  // Sécurité type
  if (typeof titre !== "string" || typeof description !== "string") {
    return res.status(400).json({ error: "Données invalides" });
  }

  // Nettoyage
  titre = titre.trim();
  description = description.trim();

  // Validation
  if (titre.length < 3 || description.length === 0) {
    return res.status(400).json({
      error: "Titre et description obligatoires"
    });
  }

  // 🔒 Vérification doublon (ASYNC)
  const checkSql = "SELECT id FROM cours WHERE titre = ?";
  db.query(checkSql, [titre], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (rows.length > 0) {
      return res.status(400).json({ error: "Cours déjà existant" });
    }

    // INSERT seulement si aucun doublon
    const insertSql = "INSERT INTO cours (titre, description) VALUES (?, ?)";
    db.query(insertSql, [titre, description], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Erreur serveur" });
      }

      res.status(201).json({
        id: result.insertId,
        titre,
        description
      });
    });
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


// INSCRIPTION LECTEUR (VERSION SIMPLE - FORMATION)
app.post("/register", (req, res) => {
  console.log("📩 Données reçues :", req.body);

  let { nom, email, password } = req.body;

  if (!nom || !email || !password) {
    console.log("❌ Champs manquants");
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  nom = nom.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

  console.log("🧹 Après trim :", nom, email);

  const checkSql = "SELECT id FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, rows) => {
    if (err) {
      console.error("❌ Erreur SELECT :", err);
      return res.status(500).json({ error: "Erreur serveur SELECT" });
    }

    if (rows.length > 0) {
      console.log("⚠️ Email déjà utilisé");
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    const insertSql =
      "INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(
      insertSql,
      [nom, email, password, "lecteur"],
      (err, result) => {
        if (err) {
          console.error("❌ Erreur INSERT :", err);
          return res.status(500).json({ error: "Erreur serveur INSERT" });
        }

        console.log("✅ Utilisateur inséré :", result.insertId);

        res.status(201).json({ message: "Inscription réussie" });
      }
    );
  });
});






// l'url de demarrage du 
app.listen(5000, ()=>{
     console.log("Serveur démarré sur http://localhost:5000");
});

