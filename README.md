# JSMRecipes


## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.


# Structure du Projet

## public/
- Contient les fichiers statiques accessibles publiquement, tels que les images ou les feuilles de style.
- Le JavaScript côté client est inclus ici.

## training/
- Scripts Python liés à l'entraînement de l'IA.

    - **Dataloader.py:**
      - Charge les données.

    - **train.py:**
      - Effectue l'entraînement du modèle sur le jeu de données.
      - Définition des classes (par exemple : 5 images = 5 fichiers).
      - Batch size : Nombre de photos que ResNet lit en même temps.
      - Nombre d'epochs : Nombre de fois où le jeu de données est parcouru.
      - Learning rate : Plus il est bas, plus l'entraînement est précis mais plus long.
      - Boucle d'entraînement.
      - Sauvegarde tous les poids d'entraînement dans un fichier .pth.
      - Nombre de pertes de mémoire à la fin de l'entraînement.

    - **evaluate.py:**
      - Concept similaire à train mais sur un jeu de données plus restreint pour l'évaluation.

    - **fruits.pth:**
      - Poids d'entraînement utilisé dans fruits.py.

    - **fruits.py:**
      - Fichier exécuté sur le site.
      - Prend la photo téléchargée sur le site, la transforme dans la forme que ResNet 18 peut reconnaître.
      - Analyse pour reconnaître à quelle classe l'image appartient.

## routes/
- Gestionnaire de routes Express.js.

    - **home.js:**
      - Routes liées à la page d'accueil.

## views/
- Modèles Pug.

    - **layout.pug:**
      - Modèle de mise en page principal.

## app.js:
- Point d'entrée principal de votre application Node.js/Express.

## package.json:
- Fichier qui gère les dépendances de votre projet.

## Installation


Extensions à avoir sur VScode  pour lire le .db : 
    - SQLite3 editor
    - SQLite
    - SQLserver

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.
