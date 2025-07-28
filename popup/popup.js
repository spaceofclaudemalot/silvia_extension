// Script UI pour la popup : n'importe que les modules nécessaires
import { TaskManager } from "../shared/task-manager.js";
import { showNotification } from "../shared/notification.js";

document.addEventListener("DOMContentLoaded", () => {
  new TaskManager();
  showNotification({
    title: "Bienvenue",
    message: "Popup ouverte",
    type: "info",
  });
});
