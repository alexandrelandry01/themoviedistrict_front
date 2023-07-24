import { createRouter, createWebHistory } from 'vue-router'
import AppHome from './components/AppHome.vue'
import AppAllMovies from './components/AppAllMovies.vue'
import AppFindByLocation from './components/AppFindByLocation.vue'
import AppAbout from './components/AppAbout.vue'
import AddMovie from './components/management/AddMovie.vue'
import AddArticle from './components/management/AddArticle.vue'
import EditArticle from './components/management/EditArticle.vue'
import PageNotFound from './components/PageNotFound.vue'
import AppMovie from './components/AppMovie.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: "Home", component: AppHome },
        { path: '/FindByLocation', name: 'FindByLocation', component: AppFindByLocation },
        { path: '/AllMovies', name: 'AllMovies', component: AppAllMovies },
        { path: '/About', name: 'About', component: AppAbout },
        { path: '/AddMovie', name: 'AddMovie', component: AddMovie },
        { path: '/AddArticle', name: 'AddArticle', component: AddArticle },
        { path: '/EditArticle/:id', name: 'EditArticle', component: EditArticle },
        { path: '/Movies/:id', name: 'Movie', component: AppMovie },

        { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound }
    ]
});

export default router;