document.title = "Silv.ia | HOMEPAGE";

// Script UI pour la page onglet : n'importe que les modules nécessaires
window.addEventListener("DOMContentLoaded", async () => {
  const { TaskManager } = await import("../shared/task-manager.js");
  const { showNotification } = await import("../shared/notification.js");
  new TaskManager();
  showNotification({
    title: "Bienvenue",
    message: "Onglet ouvert",
    type: "success",
  });
});
