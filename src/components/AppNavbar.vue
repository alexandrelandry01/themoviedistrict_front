<template>
    <nav>
        <div class="row">
            <div class="col-lg-9 col-sm-12 navLinks">
                <ul>
                    <div>
                        <li v-for="(link, index) in this.appNavbar.pages" :key="index">
                            <router-link :to="link.url">{{ link.name }}</router-link>
                        </li>
                    </div>                    
                </ul>                
            </div>
            <div class="col-lg-3 col-sm-12 searchElement">
                <form @submit="this.searchString(this.searchParam)" class="form-inline my-2 my-lg-0 searchBox">
                        <input class="form-control mr-sm-2 searchField" type="search" placeholder="find a movie.." aria-label="Search" v-model="this.searchParam">
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
    display: flex;
    margin: 0;
}

a {
    color: white;
}

form {
    display: inline-flex;
    width: 95%;
    flex-wrap: wrap;
    overflow: auto;
    padding-top: 10px;
}

input {
    width: 240px;
}

 li {
    display:inline-block;
    padding: 20px;
 }

 li:hover {
    background-color: white;
    > a {
        color: black;
    }
 }

 @media (max-width: 1400px) {
    .searchField {
        width: 60%;
    }
 }

 @media (max-width: 990px) {
    .searchField {
        width: 30%;
    }
 }

 .searchField {
    min-width: 160px;
 }

 .searchElement {
    background-color: black;
}

.navLinks {
    background-color: black;
}

.router-link-exact-active {
   font-weight: bold;
 }

 .searchBtn {
    color: white !important;
    border: 1px solid white !important;
 }

 .searchBtn:hover {
    background-color: white !important;
    color: black !important;
 }
</style>