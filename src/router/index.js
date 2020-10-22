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
import Kontakt from '../views/Kontakt.vue'
import MojeRajce from '../views/MojeRajce.vue'



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
        path: '/detail/:rok/:id',
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
        name: 'Pomnicky',
        component: Pomnicky
    },
    {
        path: '/studanky',
        name: 'Studanky',
        component: Studanky
    },
    {
        path: '/studanky/:kategorie',
        name: 'Studanky',
        component: Studanky
    },
    {
        path: '/smircikrize',
        name: 'SmirciKrize',
        component: SmirciKrize
    },

    {
        path: '/cesty/:rok',
        name: 'Cesty',
        component: Cesty
    },


    {
        path: '/vypraveni/:rok',
        name: 'Vypraveni',
        component: Vypraveni
    },
    {
        path: '/kontakt',
        name: 'Kontakt',
        component: Kontakt
    },
    {
        path: '/mojerajce',
        name: 'MojeRajce',
        component: MojeRajce
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router