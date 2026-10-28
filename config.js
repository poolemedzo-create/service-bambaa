/* CONFIG.JS — informations et contenus du site */
window.SITE = {
  name: "Bambaa",
  whatsappNumber: "221769987265",
  email: "medzofaye24@gmail.com",
  tiktok: "https://www.tiktok.com/@bambaa906",
  github: "https://github.com/poolemedzo-create",

  services: [
    {
      id: "web",
      emoji: "🌐",
      title: "Création de sites web",
      type: "site",
      text: "Un site clair et agréable sur téléphone, pour ton activité, ton association ou ton projet.",
      items: [
        "Sites pour particuliers, associations, commerces ou autres activités",
        "Sites de présentation",
        "Interfaces web modernes et responsives",
        "Amélioration de sites web existants",
        "Développement selon les besoins définis avec toi"
      ]
    },
    {
      id: "graphisme",
      emoji: "🎨",
      title: "Création graphique",
      type: "affiche",
      text: "Des visuels qui donnent envie de s'arrêter et de lire.",
      sub: [
        { label: "Affiche", type: "affiche" },
        { label: "Logo", type: "logo" },
        { label: "Visuel réseaux", type: "social" }
      ],
      items: [
        "Affiches pour événements et activités",
        "Logos",
        "Visuels pour les réseaux sociaux",
        "Supports de communication numériques"
      ]
    },
    {
      id: "formation",
      emoji: "💻",
      title: "Formation pour grands débutants",
      type: "formation-base",
      text: "Tu pars de zéro ? On avance pas à pas, avec des explications simples et des exercices pratiques.",
      sub: [
        { label: "Informatique", type: "formation-base" },
        { label: "Bureautique", type: "formation-bureautique" },
        { label: "Codage", type: "formation-code" }
      ],
      items: [
        "Initiation à l'informatique et à l'utilisation d'un ordinateur",
        "Bureautique : Word, Excel, PowerPoint et outils courants, selon tes besoins",
        "Initiation au codage et à la programmation",
        "Bases du développement web : HTML et CSS",
        "Initiation à l'algorithmique et au langage C",
        "Formations pour débutants complets ou personnes ayant très peu de connaissances"
      ]
    },
    {
      id: "collab",
      emoji: "🤝",
      title: "Collaboration sur un projet",
      type: "collab",
      text: "Concevoir ou développer ensemble un projet numérique ou informatique.",
      items: [
        "Travail réalisé ensemble pour concevoir ou développer un projet",
        "Avec une personne ou une équipe",
        "Ce n'est pas un service de dépannage ni d'aide sur un exercice"
      ]
    }
  ],

  fieldDefs: {
    typeSite: {
      label: "Type de site souhaité",
      kind: "select",
      options: [
        "Site de présentation",
        "Site pour une activité ou un commerce",
        "Boutique en ligne",
        "Site pour une association",
        "Autre"
      ]
    },
    objectif: {
      label: "Objectif",
      kind: "text",
      ph: "Ce que tu veux obtenir"
    },
    fonctions: {
      label: "Fonctionnalités souhaitées",
      kind: "area",
      ph: "Ex : formulaire de contact, galerie photos…"
    },
    public: {
      label: "Public visé",
      kind: "text",
      ph: "Ex : jeunes, clients de ma boutique…"
    },
    siteActuel: {
      label: "Site actuel (si tu en as un)",
      kind: "text",
      ph: "Lien du site, ou « Non »"
    },
    texte: {
      label: "Texte à afficher",
      kind: "area",
      ph: "Les mots exacts à mettre dans le visuel"
    },
    dateLieu: {
      label: "Date et lieu de l'événement",
      kind: "text",
      ph: "Si nécessaire"
    },
    style: {
      label: "Couleurs ou style souhaités",
      kind: "text",
      ph: "Ex : moderne, bleu et blanc"
    },
    dimensions: {
      label: "Dimensions",
      kind: "text",
      ph: "Si tu les connais (ex : A3)"
    },
    marque: {
      label: "Nom de la marque, de l'activité ou de l'organisation",
      kind: "text"
    },
    activite: {
      label: "Description de l'activité",
      kind: "area"
    },
    couleurs: {
      label: "Couleurs préférées",
      kind: "text"
    },
    symboles: {
      label: "Éléments ou symboles souhaités",
      kind: "text",
      ph: "Ex : une lettre, un ballon…"
    },
    reseau: {
      label: "Réseau social concerné",
      kind: "select",
      options: ["TikTok", "Instagram", "Facebook", "WhatsApp", "Autre"]
    },
    format: {
      label: "Format souhaité",
      kind: "text",
      ph: "Ex : carré, story, vertical"
    },
    domaine: {
      label: "Domaine souhaité",
      kind: "select"
    },
    niveau: {
      label: "Niveau actuel",
      kind: "select",
      options: ["Aucune connaissance", "Quelques notions"]
    },
    dispo: {
      label: "Disponibilités",
      kind: "text",
      ph: "Ex : soirs et week-ends"
    },
    modalite: {
      label: "Format souhaité",
      kind: "select",
      options: ["À distance", "En présentiel", "Peu importe"]
    },
    objProjet: {
      label: "Objectif du projet",
      kind: "text"
    },
    typeCollab: {
      label: "Type de collaboration envisagée",
      kind: "text",
      ph: "Ex : travail en équipe, partage des tâches"
    },
    taches: {
      label: "Compétences ou tâches concernées",
      kind: "area"
    },
    calendrier: {
      label: "Calendrier envisagé",
      kind: "text",
      ph: "Si connu"
    }
  },

  requests: [
    {
      id: "site",
      emoji: "🌐",
      label: "Création de site web",
      fields: ["typeSite", "objectif", "fonctions", "public", "siteActuel"]
    },
    {
      id: "affiche",
      emoji: "🖼️",
      label: "Création d'affiche",
      fields: ["objectif", "texte", "dateLieu", "style", "dimensions"]
    },
    {
      id: "logo",
      emoji: "✒️",
      label: "Création de logo",
      fields: ["marque", "activite", "style", "couleurs", "symboles"]
    },
    {
      id: "social",
      emoji: "📱",
      label: "Visuel pour les réseaux sociaux",
      fields: ["reseau", "objectif", "texte", "format", "style"]
    },
    {
      id: "formation-base",
      emoji: "💻",
      label: "Formation en informatique pour débutants",
      fields: ["domaine", "niveau", "objectif", "dispo", "modalite"],
      domaine: [
        "Utiliser un ordinateur",
        "Internet et outils numériques courants",
        "Autre notion de base"
      ]
    },
    {
      id: "formation-bureautique",
      emoji: "📊",
      label: "Formation en bureautique",
      fields: ["domaine", "niveau", "objectif", "dispo", "modalite"],
      domaine: ["Word", "Excel", "PowerPoint", "Plusieurs outils"]
    },
    {
      id: "formation-code",
      emoji: "⌨️",
      label: "Formation en codage et programmation",
      fields: ["domaine", "niveau", "objectif", "dispo", "modalite"],
      domaine: [
        "Initiation au codage",
        "HTML et CSS (bases du web)",
        "Algorithmique",
        "Langage C",
        "Je ne sais pas encore"
      ]
    },
    {
      id: "collab",
      emoji: "🤝",
      label: "Collaboration sur un projet",
      descLabel: "Description du projet",
      fields: ["objProjet", "typeCollab", "taches", "calendrier"]
    },
    {
      id: "autre",
      emoji: "✉️",
      label: "Autre demande",
      fields: [],
      descPh: "Explique librement ton besoin."
    }
  ]
};