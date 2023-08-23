<template>
    <div>
        Results : 
        <div v-if="!this.searchHasYieldedResults">
            <h5>No Results were returned from the search</h5>
        </div>
        <div v-if="this.searchHasYieldedResults">
            <ul>
                <li v-for="movie in moviesReturned" :key="movie.id">
                    <div v-if="movie.isPublished">
                        <router-link :to="'/Movies/' + movie.id">{{ movie.title + ' ' + '(' + movie.yearOfRelease + ')'}}</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import { BASE_API_URL, BASE_MOVIE_SERVICE } from '@/shared/config'

export default {
    data() {
        return {
            paramValue: this.$route.params.searchParam,
            moviesReturned: [],
            searchHasYieldedResults: Boolean
        }
    },
    async created() {
        await axios.get(BASE_API_URL + BASE_MOVIE_SERVICE + "/search/" + this.paramValue).then(response => {
            this.moviesReturned = response.data;
            if (this.moviesReturned.length > 0) {
                this.searchHasYieldedResults = true;
            } else {
                this.searchHasYieldedResults = false;
            }
        }).catch((error) => {
            throw(error);
        });
    }
    
}
</script>

<style>
    
</style>