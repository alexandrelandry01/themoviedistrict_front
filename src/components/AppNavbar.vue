<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="col-6">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-for="(link, index) in this.appNavbar.pages" :key="index">
                        <router-link :to="link.url">{{ link.name }}</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-6">
                <form @submit="this.searchString(this.searchParam)" class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="find a movie.." aria-label="Search" v-model="this.searchParam">
                        <button class="btn btn-outline-success my-2 my-sm-0 searchBtn" type="submit" :disabled="this.searchParam.length < 2">Search</button>
                </form>
            </div>
        </div>
    </nav>
 
</template>

<script>

import router from '../router'

const LINKS = require('../utilityspecs/navbarValues.json');

export default {
    name: 'AppNavBar',
    data() {
        return {
           appNavbar: JSON.parse(JSON.stringify(LINKS)),
           searchParam: ''
        }
    },
    methods: {
        searchString(string) {
            if (this.queryStringIsValid(string)) {
                router.push({ path: '/Movies/Search/' + this.searchParam });
            }
        },
        queryStringIsValid(string) {
            return string.trim() !== '';
        }
    }
}
</script>

<style scoped>
ul {
    justify-content: space-around;
}

form {
    display: inline-flex;
    float: right;
    padding-right: 2%;
}

input {
    width: 240px;
}

.router-link-exact-active {
   font-weight: bold;
 }

 .searchBtn {
    color: #0D6EFD !important;
    border: 1px solid #0D6EFD !important;
 }

 .searchBtn:hover {
    background-color: #0D6EFD !important;
    color: white !important;
 }
</style>