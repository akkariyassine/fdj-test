# Documentation de l'API Back-end

Ce document décrit les différents points de terminaison de l'API et leur fonctionnalité dans le système de gestion des ligues, des équipes et des joueurs.

## Ligues (`leagues.js`)

- `GET /`: Récupère toutes les ligues enregistrées dans la base de données et inclut les équipes associées à chaque ligue.
- `GET /allLeagueNames`: Récupère les noms de toutes les ligues disponibles.
- `GET /searchTeamsByLeague`: Cherche et retourne les équipes correspondant au nom de la ligue fourni dans la requête. La recherche est insensible à la casse.
- `GET /:id`: Récupère une ligue spécifique par son ID.
- `POST /`: Crée une nouvelle ligue avec les informations fournies dans le corps de la requête.
- `PATCH /:id`: Met à jour la ligue spécifiée par son ID avec les données fournies.
- `DELETE /:id`: Supprime la ligue spécifiée par son ID.

## Joueurs (`player.js`)

- `GET /`: Récupère tous les joueurs enregistrés dans la base de données.
- `GET /:id`: Récupère un joueur spécifique par son ID.
- `POST /`: Crée un nouveau joueur avec les informations fournies dans le corps de la requête.
- `PATCH /:id`: Met à jour le joueur spécifié par son ID avec les données fournies.
- `DELETE /:id`: Supprime le joueur spécifié par son ID.

## Équipes (`teams.js`)

- `GET /`: Récupère toutes les équipes enregistrées dans la base de données et inclut les joueurs associés à chaque équipe.
- `GET /:id`: Récupère une équipe spécifique par son ID.
- `POST /`: Crée une nouvelle équipe avec les informations fournies dans le corps de la requête.
- `PATCH /:id`: Met à jour l'équipe spécifiée par son ID avec les données fournies.
- `DELETE /:id`: Supprime l'équipe spécifiée par son ID.

## Middleware

- `getLeague`, `getPlayer`, et `getTeam`: Ce sont des fonctions intermédiaires utilisées pour récupérer l'objet ligue, joueur ou équipe par ID avant d'effectuer des opérations telles que GET, PATCH et DELETE.

---

Pour toutes les opérations CRUD, si une erreur se produit, une réponse avec le code d'état HTTP approprié et un message d'erreur est renvoyée. Ceci assure une bonne gestion des erreurs et une meilleure expérience pour les développeurs qui consomment l'API.
