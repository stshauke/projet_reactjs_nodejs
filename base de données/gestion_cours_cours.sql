-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: gestion_cours
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cours`
--

DROP TABLE IF EXISTS `cours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(100) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cours`
--

LOCK TABLES `cours` WRITE;
/*!40000 ALTER TABLE `cours` DISABLE KEYS */;
INSERT INTO `cours` VALUES (1,'Node.js débutant','Ce cours propose une introduction complète à Node.js en expliquant les bases de son fonctionnement, la gestion des modules, l’exécution côté serveur, et la création de vos premières applications web interactives.'),(2,'React avancé','Ce cours couvre les concepts avancés de React, notamment l’utilisation des Hooks, la gestion d’état avec Context API et Redux, ainsi que l’optimisation des performances et les bonnes pratiques de structuration de projets.'),(3,'Base de données MySQL','Un parcours détaillé sur la création, la gestion et l’optimisation de bases de données MySQL. Vous apprendrez à concevoir des schémas relationnels, à manipuler les données avec des requêtes SQL complexes et à implémenter un CRUD complet.'),(4,'HTML & CSS fondamentaux','Découvrez les bases indispensables du développement web avec HTML pour la structure et CSS pour la mise en forme. Apprenez à créer des pages web responsives et esthétiques tout en respectant les normes du W3C.'),(5,'JavaScript moderne','Un apprentissage approfondi de JavaScript ES6+ avec la manipulation du DOM, les fonctions fléchées, la programmation asynchrone avec Promises et async/await, ainsi que l’intégration avec les API web.'),(6,'Python pour débutants','Ce cours initie aux fondements de Python en abordant la syntaxe, les structures de données, les boucles, les fonctions, ainsi que la création de scripts utiles pour l’automatisation de tâches simples.'),(7,'Programmation orientée objet en Java','Plongez dans les principes de la POO avec Java : classes, objets, héritage, encapsulation et polymorphisme, ainsi que les bonnes pratiques pour concevoir des programmes robustes et évolutifs.'),(8,'Django pour le web','Apprenez à créer des applications web puissantes avec Django. Ce cours détaille la structure d’un projet, le système ORM, la gestion des modèles, vues, templates, ainsi que l’intégration d’API REST.'),(9,'Développement mobile avec Flutter','Explorez Flutter et Dart pour concevoir des applications mobiles multiplateformes performantes. Le cours couvre la gestion des widgets, la navigation, l’état et le déploiement sur Android et iOS.'),(10,'Sécurité informatique de base','Introduction aux concepts essentiels de cybersécurité : chiffrement, authentification, gestion des accès, protection des données et prévention contre les attaques courantes comme le phishing ou les injections SQL.'),(11,'Linux administration','Un guide pratique pour administrer un système Linux : gestion des utilisateurs, permissions, processus, configuration réseau, installation de paquets et automatisation avec des scripts shell.'),(12,'Git et GitHub','Maîtrisez le contrôle de version avec Git et collaborez efficacement via GitHub. Le cours explique les branches, les merges, les pull requests, la gestion des conflits et les workflows collaboratifs.'),(13,'Intelligence artificielle introduction','Ce cours présente les bases de l’intelligence artificielle, y compris l’apprentissage supervisé et non supervisé, les réseaux de neurones, et des exemples pratiques avec des bibliothèques comme TensorFlow et Scikit-learn.'),(14,'Machine Learning pratique','Apprenez à appliquer le Machine Learning sur des jeux de données réels : préparation des données, choix des algorithmes, entraînement des modèles, validation croisée et optimisation des hyperparamètres.'),(15,'Data Science avec Python','Un parcours complet qui couvre l’analyse de données avec Pandas, la visualisation avec Matplotlib et Seaborn, ainsi que les bases de la modélisation statistique et prédictive.'),(16,'Docker et conteneurisation','Comprenez la conteneurisation avec Docker, apprenez à créer et déployer des images, gérer des conteneurs, configurer des réseaux et utiliser Docker Compose pour orchestrer vos environnements.'),(17,'Kubernetes initiation','Découvrez Kubernetes et son rôle dans l’orchestration de conteneurs. Ce cours explique les pods, services, déploiements, ConfigMaps et les bases de la mise à l’échelle automatique.'),(18,'Cloud avec AWS','Initiez-vous aux services cloud d’Amazon Web Services, notamment EC2, S3, RDS et Lambda. Vous apprendrez à déployer une application complète et à gérer les ressources dans le cloud.'),(19,'Développement d’API REST','Apprenez à concevoir et implémenter des API REST robustes, documentées et sécurisées. Le cours couvre les principes REST, l’authentification, la pagination et la gestion des erreurs.'),(20,'UX/UI Design','Un cours sur la conception d’expériences utilisateurs intuitives et esthétiques. Vous apprendrez les bases de la psychologie cognitive appliquée, les wireframes, le prototypage et les bonnes pratiques en design d’interfaces.');
/*!40000 ALTER TABLE `cours` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-02 21:47:18
