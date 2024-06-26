
# Projet PDM : Critiqu'O Ciné

## Partie 1 : Introduction du projet
Ce projet a été réalisé dans le cadre du cours "Projet Développement Mobile" du M1 MIAGE, par **Wyss Marie** et **Xu Sicong**.
Il consiste au développement d'une application mobile dédiée à la consultation de films. 
Cette application permet aux utilisateurs de naviguer parmi les films, de les rechercher et de poster des commentaires. 
Elle a pour but de fournir une interface utilisateur intuitive, permettant aux cinéphiles de facilement accéder aux informations sur les films et de partager leurs expériences de visionnage avec d'autres utilisateurs.

Le lien de ce projet est 
````
https://github.com/l3miage-wyssm/CritiquO-Cine
````
## Partie 2 : Fonctionnalités

### *Navigation et recherche de films :*
Les utilisateurs peuvent parcourir tous les films sur la page d'accueil. Une recherche floue par nom de film est disponible.

### *Fonctionnalités de tri :*
Les utilisateurs peuvent trier les films par note, par année de sortie et par ordre alphabétique.

### *Fonctionnalité de commentaires :*
Les utilisateurs peuvent voir les commentaires d'autres utilisateurs et poster leurs propres évaluations des films

### *Fonctionnalité d'aimer ou ne pas aimer un film :*
Les utilisateurs peuvent exprimer leur appréciation pour un film en cliquant sur l'icône en forme de cœur située en haut à droite, depuis la page d'accueil ou la page de détails du film.

### *Page d'accueil :*
Cette page présente tous les films disponibles dans la bibliothèque. Elle permet également de rechercher et de trier les films directement depuis cette interface.

### *Page du menu latéral :*
Cette page est accessible via un bouton de liste situé dans l'en-tête à gauche. Elle permet un accès rapide à la page d'accueil, affiche la liste des films favoris et offre la possibilité de se déconnecter du compte utilisateur en cours.

### *Page de détails du film :*
Affiche des informations détaillées sur le film, y compris un résumé, une liste d'acteurs, etc., ainsi que les commentaires des utilisateurs.

### *Page de détails d'acteur :*
Cette page présente des informations détaillées sur un acteur, ainsi que les films dans lesquels il a joué.

### *Page de profil utilisateur :*
Les utilisateurs peuvent voir et éditer leur propre profil.

### *Page de la liste des films favori :*
Cette page affiche tous les films pour lesquels l'utilisateur a cliqué sur l'icône de cœur, indiquant qu'il les apprécie.

### *Page de connecxion :*
Les utilisateurs peuvent se connecter sur cette page soit en utilisant leur nom d'utilisateur et mot de passe, soit via leur compte Google. Cependant, en l'absence de backend de données, un clic sur le bouton de connexion chargera les informations d'un utilisateur par défaut, sans authentification réelle par mot de passe.

## Partie 3 : Gestion des données via requêtes HTTPS
Dans ce projet, toutes les données extraites par des requêtes HTTPS sont stockées à distance dans des fichiers JSON hébergés sur un autre projet GitHub. Les données sont accessibles via le lien suivant :

````
https://github.com/l3miage-xusi/PDM_API
````

## Partie 4 : Structure du projet

````
/CritiquOCine
    /asset      # Ressources statiques telles que images
    /component  # Composants de l'application
    /interface  # Structures des entités utilisées dans l'application
    App.tsx     # Navigation du projet et le composant HeaderBar
    README
    
````
## Partie 5 : Lancement du projet

Pour lancer le projet sur Android :
````bash
react-native start 
````
