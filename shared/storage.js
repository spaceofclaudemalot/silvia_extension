const appData = {
  tasks: [
    {
      id: "uuid-string",
      name: "Nom de la tâche",
      importance: 1 - 4, // 1=faible, 4=très important
      deadline: "2024-07-15", // format ISO date
      project: "perso", // nom du projet
      createdAt: "2024-06-28T10:30:00Z", // ISO timestamp
      notes: "Informations supplémentaires",
      completed: false,
      completedAt: null, // timestamp si terminé
    },
  ],
  projects: [
    {
      name: "perso",
      color: "#3498db",
      createdAt: "2024-06-28T10:30:00Z",
    },
  ],
  settings: {
    urgentDaysThreshold: 3, // < 3 jours = urgent
    importantThreshold: 3, // importance >= 3 = important
    notificationsEnabled: true,
  },
  notes: "Notes globales pour la vue tab",
};
