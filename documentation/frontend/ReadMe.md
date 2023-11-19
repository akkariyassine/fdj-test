# Documentation du Front-end

Ce README fournit une description des modules principaux du front-end de notre application Angular.

## Configuration de la Route Principale

La configuration de la route principale (`AppRoutingModule`) définit les chemins pour accéder aux différents modules de l'application :

- `leagues`: Charge le module `LeaguesModule` de manière paresseuse (`lazy loading`) qui contient les fonctionnalités liées aux ligues.
- `teams`: Charge le module `TeamsModule` de manière paresseuse qui contient les fonctionnalités liées aux équipes.
- `players`: Charge le module `PlayersModule` de manière paresseuse qui contient les fonctionnalités liées aux joueurs.

## Module des Équipes (`TeamsModule`)

Le composant principal du module des équipes (`TeamListComponent`) permet aux utilisateurs de :

- Rechercher des équipes par nom à l'aide d'une barre de recherche qui utilise une saisie automatique pour affiner les résultats.
- Annuler la recherche et réinitialiser les résultats affichés.
- Naviguer vers la page de détails de l'équipe en cliquant sur une équipe dans la liste.

Si aucune équipe n'est trouvée ou si la recherche n'a pas encore été initiée, des images spécifiques sont affichées pour guider l'utilisateur.

## Module des Joueurs (`PlayersModule`)

Le composant principal du module des joueurs (`PlayersListComponent`) affiche :

- Un en-tête avec le nom de l'équipe et un bouton de retour pour revenir à la vue précédente.
- Une liste de joueurs avec des informations telles que le nom, la position, la date de naissance et le prix.
- Une image spécifique si aucune information sur les joueurs n'est disponible.

Ce composant récupère les informations de l'équipe et des joueurs en fonction de l'identifiant passé dans l'URL.

## Modèle de Ligue

Le modèle de ligue est utilisé dans le `TeamsModule` pour représenter les données liées aux ligues. Il contient des informations telles que le nom et les équipes associées à chaque ligue.

---

L'application utilise Angular Material pour certains éléments de l'interface utilisateur et suit une approche modulaire pour organiser les fonctionnalités. Les services associés à chaque module permettent de récupérer les données nécessaires depuis le back-end via des requêtes HTTP.
