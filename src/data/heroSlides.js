/**
 * Hero carousel slides configuration
 * Each slide represents a main category with hero image and CTA
 */
export const heroSlides = [
  {
    id: 1,
    title: "Pomníčky",
    subtitle: "Prozkoumejte pomníčky v okolí Brna",
    image: "uvodniStrana.jpg", // Using existing background image
    cta: {
      text: "Prozkoumat",
      link: "/pomnicky",
    },
  },
  {
    id: 2,
    title: "Smírčí\nKříže",
    subtitle: "Smírčí kříže a jejich fascinující příběhy",
    image: "uvodniStrana.jpg", // Reusing for now - can be replaced with specific image
    cta: {
      text: "Zjistit více",
      link: "/krize",
    },
  },
  {
    id: 3,
    title: "Studánky",
    subtitle: "Studánky a prameny v brněnském okolí",
    image: "uvodniStrana.jpg", // Reusing for now - can be replaced with specific image
    cta: {
      text: "Navštívit",
      link: "/studanky",
    },
  },
  {
    id: 4,
    title: "POUTAVÁ\nVYPRÁVĚNÍ",
    subtitle: "Články a příběhy z okolí Brna",
    image: "uvodniStrana.jpg",
    cta: {
      text: "Číst",
      link: "/vypraveni",
    },
  },
  {
    id: 5,
    title: "Cesty",
    subtitle: "Cesty a trasy pro vaše další dobrodružství",
    image: "uvodniStrana.jpg",
    cta: {
      text: "Vyrazit",
      link: "/cesty",
    },
  },
];
