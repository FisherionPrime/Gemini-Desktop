# ✨ Gemini Desktop Pro

Une application de bureau native pour Google Gemini, construite avec **Electron**. 
Conçue pour offrir une expérience immersive, sans bordures ("frameless") et parfaitement intégrée à Windows.

## 🚀 Fonctionnalités

* **Design "Frameless" :** Interface épurée sans la barre de titre Windows standard.
* **Intégration Native :** Les boutons de fenêtre (Fermer, Réduire) flottent au-dessus de l'interface avec un effet de transparence.
* **Injection CSS Intelligente :** * Adaptation de la mise en page de Gemini pour s'aligner avec l'application de bureau.
    * Scrollbars personnalisées et minimalistes.
    * Correction des chevauchements de la barre latérale et du menu utilisateur.
* **Zone de déplacement personnalisée :** Une "poignée" invisible en haut de l'écran permet de déplacer la fenêtre tout en laissant les boutons cliquables.
* **Portable :** Application compilée en `.exe` autonome.

## 🛠 Installation

1.  Allez dans la section **Releases** de ce dépôt (à droite).
2.  Téléchargez le fichier `Gemini.Pro.Setup.exe`.
3.  Lancez l'installation.
4.  Profitez de Gemini directement sur votre bureau !

## 💻 Développement

Si vous souhaitez modifier le code source ou compiler vous-même l'application :

### Prérequis
* [Node.js](https://nodejs.org/) (LTS)
* [Git](https://git-scm.com/)

### Commandes

```bash
# Cloner le dépôt
git clone [https://github.com/TON_NOM_UTILISATEUR/gemini-desktop.git](https://github.com/TON_NOM_UTILISATEUR/gemini-desktop.git)

# Entrer dans le dossier
cd gemini-desktop

# Installer les dépendances
npm install

# Lancer en mode développement (Hot reload)
npm start

# Compiler l'application pour Windows (.exe)
# Note : À lancer en administrateur si vous avez des erreurs de liens symboliques
npm run build
