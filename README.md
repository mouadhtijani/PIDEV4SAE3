# PIDV – Gestion des Réclamations

![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)

## Table des matières

1. [Contexte & Objectifs](#contexte--objectifs)
2. [Fonctionnalités](#fonctionnalités)

   * [Partie Utilisateur](#partie-utilisateur)
   * [Partie Administrateur](#partie-administrateur)
3. [Architecture](#architecture)

   * [Front-end (Angular)](#front-end-angular)
   * [Back-end (Spring Boot)](#back-end-spring-boot)
4. [Technologies utilisées](#technologies-utilisées)
5. [Prérequis](#prérequis)
6. [Installation](#installation)

   * [Back-end](#back-end)
   * [Front-end](#front-end)
7. [Configuration](#configuration)
8. [Lancer l’application](#lancer-lapplication)
9. [Tests](#tests)
10. [Contribution](#contribution)
11. [Licence](#licence)

---

## Contexte & Objectifs

Ce projet a pour but de fournir une **gestion complète des réclamations** :

* Une **interface utilisateur** où tout un chacun peut **créer** et **suivre** ses réclamations.
* Un **back-office administrateur** pour **traiter**, **répondre**, **traduire** et **analyser le sentiment** des réclamations, ainsi qu’**exporter l’historique** des actions.

---

## Fonctionnalités

### Partie Utilisateur

* **Création de réclamation**

  * Champ Titre, Type d’utilisateur (Étudiant / Entreprise), Description
  * Soumission, affichage immédiat dans la liste “Mes Réclamations”

* **Consulter le statut**

  * Statuts : `PENDING`, `IN_PROGRESS`, `RESOLVED`
  * Affichage de la date de création et réponse agent (si disponible)

* **Chatbot d’aide**

  * Questions fréquentes et réponse en langage naturel
  * Recherche floue (Levenshtein) parmi les questions connues
  * Se déclenche depuis le bouton “Aide / Chatbot”

### Partie Administrateur

* **Tableau de bord SB-Admin**

  * Sidebar et topnav Bootstrap
  * Lien vers “Gérer les réclamations”

* **Liste des réclamations**

  * Vue liste de toutes les réclamations avec filtres par statut

* **Détail & traitement**

  * Écrire / modifier la réponse administrative
  * Enregistrer le statut

* **Traduction multilingue**

  * Sélecteur de langue (FR, EN, ES, …)
  * Bouton “Translate” appelant l’API de traduction

* **Analyse de sentiment**

  * Score et polarité (POSITIVE, NEUTRAL, NEGATIVE)
  * Affichage coloré selon la polarité

* **Historique des actions**

  * Table exportable en Excel (via `xlsx`)
  * Entrées : création & réponse

---

## Architecture

### Front-end (Angular)

```
src/
├── app/
│   ├── components/
│   │   ├── reclamation/            # Partie utilisateur
│   │   │   ├── reclamation.component.ts/html/css
│   │   │   └── chat-bot/           # Chatbot d’aide
│   │   └── admin/
│   │       └── reclamations/       # Partie admin
│   │           ├── admin-reclamations.component.ts/html/css
│   │           └── services/
│   │               └── translation.service.ts
│   │               └── sentiment.service.ts
│   ├── app.component.html          # SB-Admin shell + <router-outlet>
│   └── app-routing.module.ts       # Routes /reclamation et /admin/reclamations
└── assets/
    └── demo/                       # scripts Chart.js & DataTables
```

### Back-end (Spring Boot)

```
src/main/java/…
├── controller/
│   ├── ReclamationController.java       # API CRUD réclamations
│   └── AdminController.java             # Endpoints traduction / sentiment
├── service/
│   ├── ChatbotService.java              # Levenshtein + Q/A
│   ├── ReclamationService.java
│   ├── TranslationService.java          # Appels API externes
│   └── SentimentAnalysisService.java
├── model/
│   ├── Reclamation.java
│   ├── HistoryEntry.java
│   └── enums/
│       ├── Status.java
│       ├── ActionType.java
│       └── Sentiment.java
└── repository/
    ├── ReclamationRepository.java
    └── HistoryRepository.java
```

---

## Technologies utilisées

* **Front-end** : Angular, Bootstrap 5, SB-Admin 2, ngx-bootstrap, FontAwesome
* **Back-end** : Spring Boot, Spring Data JPA, H2 / PostgreSQL
* **Chatbot** : Apache Commons Text (Levenshtein)
* **Traduction & Sentiment** : Intégration API externes (Google Translate, Azure Text Analytics…)
* **Export Excel** : Apache POI ou `xlsx` (JS)
* **QR Code** : ZXing (back-end) ou `qrcode` (front-end)
* **Tests** : JUnit, Mockito, Karma/Jasmine

---

## Prérequis

* **Java 11+**, **Maven** ou **Gradle**
* **Node.js 14+**, **Angular CLI 14+**
* **Git**

---

## Installation

### Back-end

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/votre-org/pidv-reclamation.git
   cd pidv-reclamation/backend
   ```
2. Configurer la BDD (**application.yml**)
3. Lancer :

   ```bash
   mvn spring-boot:run
   ```

### Front-end

1. Aller dans le dossier Angular :

   ```bash
   cd ../frontend
   ```
2. Installer les dépendances :

   ```bash
   npm install
   ```
3. Lancer le dev-server :

   ```bash
   ng serve --open
   ```

---

## Configuration

* **Back-end** : `src/main/resources/application.yml`

  * URL BDD, clés API traduction & sentiment, etc.

* **Front-end** : `src/environments/`

  * Pointez `apiUrl: 'http://localhost:8080/api'`

---

## Lancer l’application

1. Démarrez le **back-end** (port 8080)
2. Démarrez le **front-end** (port 4200)
3. Ouvrez `http://localhost:4200`

   * **Utilisateur** → `/reclamation`
   * **Admin** → `/admin/reclamations`

---

## Tests

* **Back-end** :

  ```bash
  mvn test
  ```
* **Front-end** :

  ```bash
  ng test
  ```

---

## Contribution

1. Forkez ce dépôt
2. Créez une branche `feature/ma-feature`
3. Commettez vos changements
4. Ouvrez un Pull Request

---

## Licence

Ce projet est distribué sous licence [MIT](LICENSE).
