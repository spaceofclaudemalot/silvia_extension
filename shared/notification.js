// Module de notification réutilisable pour extension Chrome/Firefox
// Utilisation : import { showNotification } from './notification.js';

export function showNotification({
  title = "Notification",
  message = "",
  type = "info", // info, success, warning, error
  timeout = 4000,
} = {}) {
  // Crée un conteneur s'il n'existe pas
  let container = document.getElementById("silvia-notification-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "silvia-notification-container";
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  // Crée la notification
  const notif = document.createElement("div");
  notif.className = `silvia-notification silvia-notification--${type}`;
  notif.style.background =
    type === "success"
      ? "#4caf50"
      : type === "error"
      ? "#f44336"
      : type === "warning"
      ? "#ff9800"
      : "#2196f3";
  notif.style.color = "#fff";
  notif.style.padding = "12px 20px";
  notif.style.marginBottom = "10px";
  notif.style.borderRadius = "6px";
  notif.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  notif.innerHTML = `<strong>${title}</strong><br>${message}`;

  container.appendChild(notif);

  setTimeout(() => {
    notif.remove();
    if (!container.hasChildNodes()) container.remove();
  }, timeout);
}
