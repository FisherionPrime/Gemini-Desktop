const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "Gemini Pro",
    icon: path.join(__dirname, 'icon.png'),
    backgroundColor: '#131314',
    
    // On cache la barre titre standard
    titleBarStyle: 'hidden',
    // On garde les boutons Windows (croix, réduire) mais on rend leur FOND transparent
    titleBarOverlay: {
      color: '#00000000', // Transparent ! Laisse voir le site derrière
      symbolColor: '#e3e3e3', // Couleur des icônes (blanc cassé)
      height: 35
    },

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadURL('https://gemini.google.com/app');

  win.webContents.on('did-finish-load', () => {
    
    // 1. CSS CHIRURGICAL (Le plus léger possible)
    win.webContents.insertCSS(`
      /* On ne touche PAS au corps du site pour que la barre latérale reste nickel */
      
      /* On cible la zone utilisateur en haut à droite (Profil + bouton Gemini Advanced) */
      /* On ajoute une marge à droite pour qu'ils ne soient pas cachés par les boutons Windows */
      header {
        padding-right: 160px !important; /* Décalage de sécurité */
        padding-top: 10px !important;    /* Un tout petit peu d'espace en haut */
      }

      /* On s'assure que le bouton Menu (hamburger) en haut à gauche est accessible */
      /* Normalement, sans margin-top sur le body, il est bien placé */
      
      /* Scrollbar propre */
      ::-webkit-scrollbar { width: 8px; background: transparent; }
      ::-webkit-scrollbar-thumb { background: #444746; border-radius: 4px; }
    `);

    // 2. LA ZONE DE DÉPLACEMENT (Invisible)
    win.webContents.executeJavaScript(`
      // Création d'une barre invisible tout en haut pour bouger la fenêtre
      const dragDiv = document.createElement('div');
      dragDiv.style.position = 'fixed';
      dragDiv.style.top = '0';
      dragDiv.style.left = '60px'; /* On laisse libre le bouton Menu à gauche */
      dragDiv.style.width = 'calc(100% - 220px)'; /* On s'arrête avant les boutons Windows */
      dragDiv.style.height = '30px';
      dragDiv.style.zIndex = '9999';
      dragDiv.style.webkitAppRegion = 'drag'; // C'est ça qui permet le déplacement
      // dragDiv.style.backgroundColor = 'rgba(255,0,0,0.2)'; // Décommente cette ligne si tu veux VOIR la zone de drag pour tester
      document.body.appendChild(dragDiv);
    `);
  });

  // Gestion des liens externes
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});