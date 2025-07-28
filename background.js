// Service worker pour l'extension : listeners globaux, gestion des messages, etc.
self.addEventListener("install", (event) => {
  // Installation de l'extension
  console.log("Silvia Extension installée");
});

self.addEventListener("activate", (event) => {
  // Activation de l'extension
  console.log("Silvia Extension activée");
});

// Exemple de listener pour messages entre scripts
self.addEventListener("message", (event) => {
  // Traiter les messages ici
  // event.data
});
