# P6_OC
# Hedi_Rivas_6_18052022 : HOT TAKES

Ce répository contient le code du projet n°6 du cursus "Développeur Web" d'Openclassrooms.

Il s'agit de **Hot Takes** : une applications de notations de critique de sauces piquantes !

Pour faire fonctionner ce projet, il faut tout tout d'abord installer le frontend de l'application situé à l'adresse suivante et suivre les instructions :

https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

Une fois le projet installé, créer un dossier backend en dehors du dossier Web-Developer-P6 puis cloner le repository suivant :

`https://github.com/HediRiva/P6_OC.git`

Faites ensuite un `npm install` et `npm install nodemon` pour installer les packages nécessaires à l'utilisation du backend.

Il faudra également créer dans le dossier backend un dossier nommé : `images`. Celui-ci contiendra toutes les images que vous utiliserez à la création d'une sauce.

Ce projet utilise les variables d'environnements (.dotenv) pour protéger les mots de passes et le token appelé dans le code.
Il faut donc créer un fichier .env à la racine du dossier backend et renseigner les lignes suivantes :

- `MongoDB_USER = "ajouter ici l'adresse d'accès à la base de données que vous souhaitez utiliser"`
- `MY_TOKEN = 'ajouter ici un token aléatoire'`

Pour ce projet j'utilise mongoDB (une base de données gratuite). Vous pouvez en créer une rapidement en suivant ce cours :

https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466348-configurez-votre-base-de-donnees

Une fois l'installation terminée, il faut lancer deux terminaux :

- depuis le dossier `backend` lancez la commande `nodemon server`
- depuis le dossier `Web-Developer-P6` (qui contient le frontend) lancez la commande `npm start`
