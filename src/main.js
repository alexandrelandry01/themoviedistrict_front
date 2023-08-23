import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import Vuex from 'vuex'


import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import createPersistedState from 'vuex-persistedstate'
import router from './router.js'

const app = createApp(App);
const appStore = createStore({ 
    state: {
        user: null,
        token: null,
        isAdmin: false
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    mutations: {
        SET_USER (state, user) {
            state.user = user;
        },
        SET_TOKEN (state, token) {
            state.token = token;
        },
        SET_IS_ADMIN (state, isAdmin) {
            state.isAdmin = isAdmin;
        }
    },
    getters: {
        currentUser() {
            return this.state.user;
        },
        userToken() {
            return this.state.token;
        },
        isAdmin() {
            return this.state.isAdmin;
        }
    },
    actions: {
        setUser: ({ commit }, user) => {
            commit('SET_USER', user);
        },
        setToken: ({ commit }, token) => {
            commit('SET_TOKEN', token);
        },
        setIsAdmin: ({ commit }, isAdmin) => {
            commit('SET_IS_ADMIN', isAdmin);
        }
    }
});

app.use(Vuex);

app.use(appStore);
app.use(router)
app.use(bootstrap)
app.mount('#app')