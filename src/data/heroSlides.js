/**
 * Hero carousel slides configuration
 * Each slide represents a main category with hero image and CTA
 */
export const heroSlides = [
  {
    id: 1,
    title: "OBJEVTE\nVAŠE DESTINACE",
    subtitle: "Prozkoumejte pomníčky, smírčí kříže a studánky v okolí Brna",
    image: "uvodniStrana.jpg", // Using existing background image
    cta: {
      text: "Prozkoumat",
      link: "/pomnicky",
    },
    routePath: {
      start: { x: 200, y: 50 },
      end: { x: 240, y: 250 },
    },
  },
  {
    id: 2,
    title: "HISTORICKÉ\nKŘÍŽE",
    subtitle: "Smírčí kříže a jejich fascinující příběhy",
    image: "uvodniStrana.jpg", // Reusing for now - can be replaced with specific image
    cta: {
      text: "Zjistit více",
      link: "/krize",
    },
    routePath: {
      start: { x: 180, y: 60 },
      end: { x: 260, y: 240 },
    },
  },
  {
    id: 3,
    title: "PŘÍRODNÍ\nKRÁSY",
    subtitle: "Studánky a prameny v brněnském okolí",
    image: "uvodniStrana.jpg", // Reusing for now - can be replaced with specific image
    cta: {
      text: "Navštívit",
      link: "/studanky",
    },
    routePath: {
      start: { x: 220, y: 40 },
      end: { x: 220, y: 260 },
    },
  },
];

