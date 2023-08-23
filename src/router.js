import { createRouter, createWebHistory } from 'vue-router'
import AppHome from './components/AppHome.vue'
import AppAllMovies from './components/AppAllMovies.vue'
import AppFindByLocation from './components/AppFindByLocation.vue'
import AppFindByCountry from './components/AppFindByCountry.vue'
import AppFindByCountryAndTerritory from './components/AppFindByCountryAndTerritory.vue'
import AppAbout from './components/AppAbout.vue'
import AddMovie from './components/management/AddMovie.vue'
import EditMovie from './components/management/EditMovie.vue'
import AddArticle from './components/management/AddArticle.vue'
import EditArticle from './components/management/EditArticle.vue'
import LoginPage from './components/management/LoginPage.vue'
import PageNotFound from './components/PageNotFound.vue'
import AppMovie from './components/AppMovie.vue'
import AppSearchResults from './components/AppSearchResults.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: "Home", component: AppHome },
        { path: '/FindByLocation', name: 'FindByLocation', component: AppFindByLocation },
        { path: '/AllMovies', name: 'AllMovies', component: AppAllMovies },
        { path: '/About', name: 'About', component: AppAbout },
        { path: '/AddMovie', name: 'AddMovie', component: AddMovie },        
        { path: '/EditMovie/:id', name: 'EditMovie', component: EditMovie },
        { path: '/AddArticle', name: 'AddArticle', component: AddArticle },
        { path: '/EditArticle/:id', name: 'EditArticle', component: EditArticle },
        { path: '/Movies/:id', name: 'Movie', component: AppMovie },
        { path: '/Movies/FindByCountry/:country/:territory', name: 'FindByCountryAndTerritory', component: AppFindByCountryAndTerritory },
        { path: '/Movies/FindByCountry/:country', name: 'FindByCountry', component: AppFindByCountry },
        { path: '/Movies/Search/:searchParam', name: 'Search', component: AppSearchResults },
        { path: '/Login', name: 'Login', component: LoginPage },

        { path: '/404', name: 'PageNotFound', component: PageNotFound },
        { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound },
    ]
});

export default router;