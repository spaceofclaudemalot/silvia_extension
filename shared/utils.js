export function createElement(tag, id, className, parent) {
  const element = document.createElement(tag);
  element.id = id;
  element.className = className;
  parent.appendChild(element);
  return element;
}

export const importanceLevelsOptions = [
  { value: 5, label: "⭐⭐⭐⭐⭐", info: "Urgence n1" },
  { value: 4, label: "⭐⭐⭐⭐", info: "haute" },
  { value: 3, label: "⭐⭐⭐", info: "normale" },
  { value: 2, label: "⭐⭐", info: "faible" },
  { value: 1, label: "⭐", info: "très faible" },
];

export const progressStatusOptions = [
  { value: "missing", label: "Information manquante" },
  { value: "todo", label: "À faire" },
  { value: "doing", label: "En cours" },
  { value: "reviewing", label: "En révision" },
  { value: "done", label: "Terminé" },
  { value: "blocked", label: "Bloqué" },
  { value: "archived", label: "Archivé" },
  { value: "cancelled", label: "Annulé" },
];
