import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/onas",
    name: "Onas",
    component: () => import("../views/Onas.vue"),
  },

  {
    path: "/odkazy",
    name: "Odkazy",
    component: () => import("../views/Odkazy.vue"),
  },
  {
    path: "/vypraveni/:podkategorie/:id",
    name: "DetailVypraveni",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/cesty/:podkategorie/:id",
    name: "DetailCesty",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/fotodetail/:kategorie/:id/:filename",
    name: "Fotodetail",
    component: () => import("../views/Fotodetail.vue"),
  },
  {
    path: "/fotodetail/:kategorie/galerie/:id/:filename",
    name: "FotodetailVypraveniGalerie",
    component: () => import("../views/Fotodetail.vue"),
  },
  {
    path: "/pomnicky",
    name: "Pomnicky",
    component: () => import("../views/Pomnicky.vue"),
  },
  {
    path: "/pomnicky/:kategorie",
    name: "PomnickyKategorie",
    component: () => import("../views/Pomnicky.vue"),
  },
  {
    path: "/pomnicky/:kategorie/long",
    name: "PomnickyKategorieLong",
    component: () => import("../views/Pomnicky.vue"),
  },
  {
    path: "/pomnicky/:kategorie/:id",
    name: "DetailPomnicku",
    component: () => import("../views/Pomnicky.vue"),
  },
  {
    path: "/studanky",
    name: "Studanky",
    component: () => import("../views/Studanky.vue"),
  },
  {
    path: "/studanky/:kategorie",
    name: "StudankyKategorie",
    component: () => import("../views/Studanky.vue"),
  },
  {
    path: "/studanky/:kategorie/long",
    name: "StudankyKategorieLong",
    component: () => import("../views/Studanky.vue"),
  },
  {
    path: "/studanky/:kategorie/:id",
    name: "DetailStudanky",
    component: () => import("../views/Studanky.vue"),
  },
  {
    path: "/krize",
    name: "SmirciKrize",
    component: () => import("../views/SmirciKrize.vue"),
  },
  {
    path: "/krize/:kategorie",
    name: "SmirciKrizeKategorie",
    component: () => import("../views/SmirciKrize.vue"),
  },
  {
    path: "/krize/:kategorie/long",
    name: "SmirciKrizeKategorieLong",
    component: () => import("../views/SmirciKrize.vue"),
  },
  {
    path: "/krize/:kategorie/:id",
    name: "DetailKrize",
    component: () => import("../views/SmirciKrize.vue"),
  },
  {
    path: "/krize/vypraveni/:kategorie/:id",
    name: "SmirciKrizeVypraveni",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/cesty",
    name: "Cesty",
    component: () => import("../views/Cesty.vue"),
  },
  {
    path: "/vypraveni",
    name: "Vypraveni",
    component: () => import("../views/Vypraveni.vue"),
  },
  {
    path: "/novepridane",
    name: "NovePridane",
    component: () => import("../views/NovePridane.vue"),
  },
  {
    path: "/novepridane/long",
    name: "NovePridaneLong",
    component: () => import("../views/NovePridane.vue"),
  },
  {
    path: "/novepridane/vypraveni/:kategorie/:id",
    name: "NoveVypraveni",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/novepridane/cesty/:kategorie/:id",
    name: "NovaCesta",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/novepridane/pomnicky/:kategorie/:id",
    name: "NovyPomnicek",
    component: () => import("../views/Pomnicky.vue"),
  },
  {
    path: "/novepridane/krize/:kategorie/:id",
    name: "NovyKriz",
    component: () => import("../views/SmirciKrize.vue"),
  },
  {
    path: "/novepridane/studanky/:kategorie/:id",
    name: "NovaStudanka",
    component: () => import("../views/Studanky.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      sessionStorage.setItem("scrollY", savedPosition.y);
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// function getRoutesList(routes, pre) {
//     return routes.reduce((array, route) => {
//       const path = `${pre}${route.path}`;

//       if (route.path !== '*') {
//         array.push(path);
//       }

//       if (route.children) {
//         array.push(...getRoutesList(route.children, `${path}/`));
//       }

//       return array;
//     }, []);
//   }

//   function getRoutesXML() {
//     const list = getRoutesList(router.options.routes, 'https://turistika-pavel-pokorny.netlify.app')
//       .map(route => `<url><loc>${route}</loc></url>`)
//       .join('\n');
//     return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//       ${list}
//     </urlset>`;
//   }

//   console.log(getRoutesXML(router.options.routes, 'https://turistika-pavel-pokorny.netlify.app/'));
export default router;
