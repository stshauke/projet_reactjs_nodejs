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





// l'url de demarrage du 
app.listen(5000, ()=>{
     console.log("Serveur démarré sur http://localhost:5000");
});

