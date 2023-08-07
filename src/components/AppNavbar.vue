<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="col-6">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-for="link in this.appNavbar.pages" :key="link.id">
                        <a class="nav-link" :href="link.url">{{ link.name }}</a>
                    </li>
                </ul>
            </div>
            <div class="col-6">
                <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="this.searchValue">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="searchString(this.searchValue)">Search</button>
                </form>
            </div>
        </div>
    </nav>
 
</template>

<script>

const LINKS = require('../utilityspecs/navbarValues.json');

export default {
    name: 'AppNavBar',
    data() {
        return {
           appNavbar: JSON.parse(JSON.stringify(LINKS)),
           searchValue: String
        }
    },
    methods: {
        searchString(string) {

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
</style>