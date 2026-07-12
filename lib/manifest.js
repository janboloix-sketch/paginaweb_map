(function () {
  "use strict";
  window.__BRAND__ = {
    name: "Fontaneria Instalaciones MAP",
    shortName: "MAP",
    kind: "Fontaner a Lleida",
    phone: "670858099",
    phoneDisplay: "670 85 80 99",
    whatsapp: "34670858099",
    whatsappDefaultText: "Hola MAP, voldria demanar informació / un pressupost.",
    address: {
      street: "Passeig de l'Onze de Setembre, 3",
      city: "25008 Lleida"
    },
    rating: { value: 5.0, count: 15 },
    // Real weekly hours. days = 0 (Sun) .. 6 (Sat).
    schedule: {
      1: { opens: 8, closes: 19, label: "Dilluns" },
      2: { opens: 8, closes: 19, label: "Dimarts" },
      3: { opens: 8, closes: 19, label: "Dimecres" },
      4: { opens: 8, closes: 19, label: "Dijous" },
      5: { opens: 8, closes: 19, label: "Divendres" }
      // Dissabte i diumenge: tancat (no entry)
    }
  };
})();
