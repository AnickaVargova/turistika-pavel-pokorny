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
  },
];
