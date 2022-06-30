# P6_OC
# Hedi_Rivas_6_18052022 : HOT TAKES

Ce repository contient le code du projet n°6 du cursus "Développeur Web" d'Openclassrooms qui consistait à créer une API pour un site de référencement et de notations de sauces.

Voici les étapes à suivre pour pouvoir faire fonctionner le projet :

**1/ Cloner le repo suivant sur votre machine: https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6 , le mettre dans un dossier frontend et lancer un `npm run start`. 


**2/ Créer un dossier `backend` en dehors du dossier Web-Developer-P6 puis cloner le repository suivant : `https://github.com/HediRiva/P6_OC.git` ,
(Il faudra également créer dans le dossier backend un dossier nommé : `images`. Celui-ci contiendra toutes les images que vous utiliserez à la création d'une sauce)


**3/ Dans le terminal, placez vous dans le dossier `backend` et faites un `npm install` et `npm install nodemon` pour installer les packages nécessaires à l'utilisation du backend.


**4/ Ce projet utilise les variables d'environnements (.dotenv) pour protéger les mots de passes et le token appelé dans le code.
Il faudra donc créer un fichier .env à la racine du dossier backend et taper les lignes suivantes :

 `MongoDB_USER = "ajouter ici l'adresse d'accès à votre base de données"`
 `MY_TOKEN = 'ajouter ici un token aléatoire'`

Dans ce projet il a été demander d'utiliser mongoDB (une base de données gratuite), pour avoir plus d'infos sur cette base de données et savoir comment l'utiliser vous pouvez regarder ce cours => `https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466348-configurez-votre-base-de-donnees`



**5/ Une fois l'installation terminée, lancez deux terminaux :

Placez vous dans le  dossier `backend` puis lancez la commande `nodemon server` et placez vous dans le dossier `Web-Developer-P6` (qui contient le frontend) puis lancez la commande `npm start`
