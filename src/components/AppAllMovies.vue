<template>
    <div>
        <h1>Movies</h1>
        <ul>
            <li v-for="movie in movies" :key="movie.id">
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
            movies: []
        }
    },
    async created() {
        await axios.get(BASE_API_URL + BASE_MOVIE_SERVICE).then(response => {
            this.movies = response.data;
        }).catch((error) => {
            throw(error);
        });
    }
}
</script>

<style>  
</style>