# 4HYBD

## Description
Voici le projet de 4HYBD , Le projet de création d'une application hybride avec Ionic pour un chat avec gestion des amis et des groupes.

## Installation
Pour installer le projet il faut d'abord installer les dépendances avec la commande suivante :
npm i

## Lancement
Pour lancer le projet il faut utiliser la commande suivante :
npm start

## Base de données
Pour la base de données nous avons utilisé MongoDB, nous vous fournissons le .env avec un cluster cloud déjà configuré.
Si vous voulez utiliser votre propre base de données il faut modifier le .env avec vos informations.

## Token
Pour la gestion des tokens nous avons utilisé jsonwebtoken, nous vous fournissons le .env avec une clé déjà configuré.

## Utilisation
Nous vous avons mis à disposition un fichier postman pour tester les routes de l'api.

## Routes
### Users /users
- POST /signup : Créer un utilisateur
- POST /login : Connecte un utilisateur
- GET /islogin : Vérifie si l'utilisateur est connecté
- PUT /update : Modifie un utilisateur
- GET /all : Récupère tous les utilisateurs
- GET /one/:id : Récupère un utilisateur par son id
- GET /stranger : Récupère tous les utilisateurs qui ne sont pas amis avec l'utilisateur connecté
- DELETE /delete : Supprime un utilisateur

### Story /users
- POST /postStory : Créer une story
- GET /getStoryInfo : Récupère toutes les infos des stories de vos amis
- GET /getStoryImage : Récupère une story d'un amis par son id
- GET /myStoryInfo : Récupère toutes les infos de votre storie
- GET /myStoryImage : Récupère votre storie


### Friends /friends
- POST /add : Ajoute un ami
- PUT /accept : Accepte une demande d'ami
- GET / : Récupère tous les amis
- GET /request : Récupère toutes les demandes d'amis
- GET /requestsend : Récupère toutes les demandes d'amis envoyées
- DELETE /delete : Supprime un ami

### ChatRoom /chatroom
- POST /create : Créer une chat room
- POST /sendMessage : Envoie un message dans une chat room
- POST /addUser : Ajoute un utilisateur dans une chat room
- PUT /updateName : Modifier le nom d'une chat room
- GET / : Récupère toutes les chat rooms avec le dernier message
- GET /:id : Récupère une chat room par son id avec tous les messages
- DELETE /delete : Supprime une chat room
- DELETE /removeUser : Supprime un utilisateur d'une chat room

