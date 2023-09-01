<template>
    <div>
        <br />
        <h4>Latest</h4>
        <ul>
            <li v-for="movie in lastFiveMovies" :key="movie.id">
                <router-link :to="'/Movies/' + movie.id">{{ movie.title + ' ' + '(' + movie.yearOfRelease + ')'}}</router-link>
            </li>
        </ul> 
    </div>
</template>

<script>

import axios from 'axios'
import { BASE_API_URL, BASE_MOVIE_SERVICE } from '@/shared/config'

export default {
    data() {
        return {
            lastFiveMovies: []
        }
    },
    created() {
        axios.get(BASE_API_URL + BASE_MOVIE_SERVICE + "/latestmovies").then(response => {
            this.lastFiveMovies = response.data;
        }).catch((error) => {
            throw(error);
        });
    }
}
</script>

<style scoped>
div {
    background-color: firebrick;
    padding: 0 0 10px 0;
} 
</style>