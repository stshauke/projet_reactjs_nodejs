# 📚 Cours Live Search

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4+-000000?style=flat&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8+-4479A1?style=flat&logo=mysql&logoColor=white)

Application web full-stack permettant d'**afficher et de rechercher en temps réel** une liste de cours stockés dans une base de données MySQL, grâce à un backend Node.js/Express et un frontend moderne en React.js.

---

## 📋 Table des matières

- [Architecture](#-architecture)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Démarrage](#-démarrage)
- [Endpoints API](#-endpoints-api)
- [Scripts disponibles](#-scripts-disponibles)
- [Variables d'environnement](#-variables-denvironnement)

---

## 🏗️ Architecture

```
cours-live-search/
├── client/                  ← Application React (port 3000)
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
├── server/                  ← Serveur Node.js/Express (port 5000)
│   ├── routes/
│   │   └── cours.js
│   ├── index.js
│   ├── .env                 ← ⚠️ À créer (non versionné)
│   └── package.json
│
└── README.md
```

**Stack technique :**

| Couche | Technologie |
|--------|-------------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Base de données | MySQL |
| Communication | API REST (JSON) |

---

## ✅ Prérequis

Assurez-vous d'avoir installé les outils suivants :

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| Node.js | v18+ | `node -v` |
| npm | v9+ | `npm -v` |
| MySQL | v8+ | `mysql --version` |

---

## 🚀 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/<votre-username>/<votre-repo>.git
cd <votre-repo>
```

### 2. Configurer la base de données MySQL

Connectez-vous à MySQL et exécutez les commandes suivantes :

```sql
mysql -u root -p

CREATE DATABASE cours_db;
USE cours_db;

CREATE TABLE cours (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titre       VARCHAR(255) NOT NULL,
  description TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Données de test (optionnel)
INSERT INTO cours (titre, description) VALUES
  ('Introduction à JavaScript', 'Bases du langage JS, variables, fonctions, DOM.'),
  ('React pour les débutants', 'Composants, props, state, hooks essentiels.'),
  ('Node.js & Express', 'Création d'API REST avec Node.js et Express.'),
  ('MySQL en pratique', 'Requêtes SQL, jointures, indexation.');
```

### 3. Installer les dépendances du serveur

```bash
cd server
npm install
```

### 4. Installer les dépendances du client

```bash
cd ../client
npm install
```

---

## ⚙️ Configuration

Créez un fichier `.env` dans le dossier `server/` :

```bash
cp server/.env.example server/.env   # si un exemple existe
# ou créez-le manuellement :
touch server/.env
```

Remplissez le fichier `server/.env` avec vos informations :

```env
# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=cours_db

# Serveur
PORT=5000
```

> ⚠️ Le fichier `.env` est listé dans `.gitignore` et ne doit **jamais** être commité.

---

## ▶️ Démarrage

Ouvrez **deux terminaux séparés** à la racine du projet.

### Terminal 1 — Démarrer le serveur Node.js

```bash
cd server

# Mode production
npm start

# Mode développement (rechargement automatique avec nodemon)
npm run dev
```

✅ Le serveur tourne sur : `http://localhost:5000`

---

### Terminal 2 — Démarrer l'application React

```bash
cd client
npm start
```

✅ L'application s'ouvre automatiquement sur : `http://localhost:3000`

---

## 🔌 Endpoints API

Base URL : `http://localhost:5000/api`

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/cours` | Récupérer tous les cours |
| `GET` | `/cours?search=javascript` | Rechercher par mot-clé (titre ou description) |
| `GET` | `/cours/:id` | Récupérer un cours par son identifiant |
| `POST` | `/cours` | Ajouter un nouveau cours |
| `PUT` | `/cours/:id` | Modifier un cours existant |
| `DELETE` | `/cours/:id` | Supprimer un cours |

### Exemple de réponse `GET /api/cours`

```json
[
  {
    "id": 1,
    "titre": "Introduction à JavaScript",
    "description": "Bases du langage JS, variables, fonctions, DOM.",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

### Exemple de corps `POST /api/cours`

```json
{
  "titre": "TypeScript avancé",
  "description": "Generics, decorators, types utilitaires."
}
```

---

## 📦 Scripts disponibles

### Serveur (`server/`)

| Commande | Description |
|----------|-------------|
| `npm start` | Démarre le serveur en mode production |
| `npm run dev` | Démarre avec nodemon (rechargement auto) |

### Client (`client/`)

| Commande | Description |
|----------|-------------|
| `npm start` | Démarre le serveur de développement React |
| `npm run build` | Compile l'application pour la production |
| `npm test` | Lance les tests |

---

## 🌍 Variables d'environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `DB_HOST` | Hôte de la base de données | `localhost` |
| `DB_USER` | Utilisateur MySQL | `root` |
| `DB_PASSWORD` | Mot de passe MySQL | _(vide)_ |
| `DB_NAME` | Nom de la base de données | `cours_db` |
| `PORT` | Port du serveur Express | `5000` |

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez votre branche : `git checkout -b feature/ma-fonctionnalite`
3. Committez vos changements : `git commit -m 'feat: ajout de ma fonctionnalité'`
4. Poussez la branche : `git push origin feature/ma-fonctionnalite`
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
