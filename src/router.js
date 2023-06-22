import { createRouter, createWebHistory } from 'vue-router'
import AppHome from './components/AppHome.vue'
import AppAllMovies from './components/AppAllMovies.vue'
import AppFindByLocation from './components/AppFindByLocation.vue'
import AppAbout from './components/AppAbout.vue'
import AddMovie from './components/management/AddMovie.vue'
import AddArticle from './components/management/AddArticle.vue'
import PageNotFound from './components/PageNotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: AppHome },
        { path: '/FindByLocation', component: AppFindByLocation },
        { path: '/AllMovies', component: AppAllMovies },
        { path: '/About', component: AppAbout },
        { path: '/AddMovie', component: AddMovie },
        { path: '/AddArticle', component: AddArticle },

        { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound }
    ]
});

export default router;