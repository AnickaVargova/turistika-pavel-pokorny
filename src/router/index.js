import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Onas from '../views/Onas.vue'
import Odkazy from '../views/Odkazy.vue'
import Detail from '../views/Detail.vue'
import Fotodetail from '../views/Fotodetail.vue'
import Pomnicky from '../views/Pomnicky.vue'
import Studanky from '../views/Studanky.vue'
import SmirciKrize from '../views/SmirciKrize.vue'
import Cesty from '../views/Cesty.vue'
import Vypraveni from '../views/Vypraveni.vue'
import DetailPomnicku from '../views/DetailPomnicku.vue'
import DetailKrize from '../views/DetailPomnicku.vue'
import NovePridane from '../views/NovePridane.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/onas',
        name: 'Onas',
        component: Onas
    },

    {
        path: '/odkazy',
        name: 'Odkazy',
        component: Odkazy
    },
    {
        path: '/vypraveni/:podkategorie/:id',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/fotodetail/:podkategorie/:id',
        name: 'Fotodetail',
        component: Fotodetail
    },
    {
        path: '/pomnicky',
        name: 'Pomnicky',
        component: Pomnicky
    },
    {
        path: '/pomnicky/:kategorie',
        name: 'PomnickyKategorie',
        component: Pomnicky
    },
    {
        path:'/pomnicky/:kategorie/:id',
        name: 'DetailPomnicku',
        component: DetailPomnicku
    },
    {
        path: '/studanky',
        name: 'Studanky',
        component: Studanky
    },
    {
        path: '/studanky/:kategorie',
        name: 'StudankKategorie',
        component: Studanky
    },
    {
        path: '/smircikrize',
        name: 'SmirciKrize',
        component: SmirciKrize
    },
    {
        path: '/smircikrize/:kategorie',
        name: 'SmirciKrizeKategorie',
        component: SmirciKrize
    },
    {
        path: '/smircikrize/:kategorie/:id',
        name: 'DetailKrize',
        component: DetailKrize
    },

    {
        path: '/cesty/:kategorie',
        name: 'Cesty',
        component: Cesty
    },
    {
        path: '/vypraveni',
        name: 'Vypraveni',
        component: Vypraveni
    },
    {
        path: '/novepridane',
        name: 'NovePridane',
        component: NovePridane,
    },
   

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router