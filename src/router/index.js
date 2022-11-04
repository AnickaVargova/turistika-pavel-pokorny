import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Onas from "../views/Onas.vue";
import Odkazy from "../views/Odkazy.vue";
import Detail from "../views/Detail.vue";
import Fotodetail from "../views/Fotodetail.vue";
import Pomnicky from "../views/Pomnicky.vue";
import Studanky from "../views/Studanky.vue";
import SmirciKrize from "../views/SmirciKrize.vue";
import Cesty from "../views/Cesty.vue";
import Vypraveni from "../views/Vypraveni.vue";
import NovePridane from "../views/NovePridane.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/onas",
    name: "Onas",
    component: Onas,
  },

  {
    path: "/odkazy",
    name: "Odkazy",
    component: Odkazy,
  },
  {
    path: "/vypraveni/:podkategorie/:id",
    name: "DetailVypraveni",
    component: Detail,
  },
  {
    path: "/cesty/:podkategorie/:id",
    name: "DetailCesty",
    component: Detail,
  },
  {
    path: "/fotodetail/:kategorie/:id/:filename",
    name: "Fotodetail",
    component: Fotodetail,
  },
  {
    path: "/pomnicky",
    name: "Pomnicky",
    component: Pomnicky,
  },
  {
    path: "/pomnicky/:kategorie",
    name: "PomnickyKategorie",
    component: Pomnicky,
  },
  {
    path: "/pomnicky/:kategorie/long",
    name: "PomnickyKategorieLong",
    component: Pomnicky,
  },
  {
    path: "/pomnicky/:kategorie/:id",
    name: "DetailPomnicku",
    component: Pomnicky,
  },
  {
    path: "/studanky",
    name: "Studanky",
    component: Studanky,
  },
  {
    path: "/studanky/:kategorie",
    name: "StudankKategorie",
    component: Studanky,
  },
  {
    path: "/krize",
    name: "SmirciKrize",
    component: SmirciKrize,
  },
  {
    path: "/krize/:kategorie",
    name: "SmirciKrizeKategorie",
    component: SmirciKrize,
  },
  {
    path: "/krize/:kategorie/long",
    name: "SmirciKrizeKategorieLong",
    component: SmirciKrize,
  },
  {
    path: "/krize/:kategorie/:id",
    name: "DetailKrize",
    component: SmirciKrize,
  },
  {
    path: "/krize/vypraveni/:kategorie/:id",
    name: "SmirciKrizeVypraveni",
    component: Detail,
  },
  {
    path: "/cesty",
    name: "Cesty",
    component: Cesty,
  },
  {
    path: "/vypraveni",
    name: "Vypraveni",
    component: Vypraveni,
  },
  {
    path: "/novepridane",
    name: "NovePridane",
    component: NovePridane,
  },
  {
    path: "/novepridane/vypraveni/:kategorie/:id",
    name: "NoveVypraveni",
    component: Detail,
  },
  {
    path: "/novepridane/cesty/:kategorie/:id",
    name: "NovaCesta",
    component: Detail,
  },
  {
    path: "/novepridane/pomnicky/:kategorie/:id",
    name: "NovyPomnicek",
    component: Pomnicky,
  },
  {
    path: "/novepridane/krize/:kategorie/:id",
    name: "NovyKriz",
    component: SmirciKrize,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
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
