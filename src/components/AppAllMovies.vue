<template>
    <div>
        <h1>Movies</h1>
        <ul>
            <li v-for="movie in movies" :key="movie.id">
                {{ movie.title }} {{ movie.yearOfRelease }}
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
        const listOfMovies = await axios.get(BASE_API_URL + BASE_MOVIE_SERVICE).then(response => {
            this.movies = response.data;
        }).catch((error) => {
            console.log(error);
            throw(error);
        });
    },    
    methods: {

    }
    
}
</script>

<style>  
</style>