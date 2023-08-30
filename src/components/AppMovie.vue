<template>
    <div>
        <h1>Filming locations for {{ this.movie.title }} ({{ this.movie.yearOfRelease }})</h1>
        <br />
        <ul>
            <div class="locationContent">
                <li v-for="location in movie.locations" :key="location.id">
                    <div class="locationSq" v-if="!location.isUnknown && !location.isFictional">
                        <p>{{ location.description }}</p>
                        <AppLocationMap :locationInstance="location"></AppLocationMap>
                        <p class="tidbit">{{ location.note === null ? '' : 'Tidbit : ' + location.note }}</p>
                    </div>
                    <div class="locationSq" v-if="location.isUnknown">
                        <p>{{ location.description }}</p>
                        <div class="unknownBlock">
                            This location is currently unknown. If you do happen to know its whereabouts, you can help by contacting me at themoviedistrict@gmail.com
                        </div>
                        <p class="tidbit">{{ location.note === null ? '' : 'Tidbit : ' + location.note }}</p>
                    </div>
                    <div class="locationSq" v-if="location.isFictional">
                        <p>{{ location.description }}</p>
                        <div class="fictionalBlock">
                            This location does not exist in real life. This either means it was a studio backlot, or that it was build on empty grounds at some remote area.
                        </div>
                        <p class="tidbit">{{ location.note === null ? '' : 'Tidbit : ' + location.note }}</p>
                    </div>           
                </li>
            </div>
        </ul>     
        <br />
        <div v-if="this.$store.state.isAdmin === true">
            <router-link :to="'/EditMovie/' + movie.id">Edit</router-link>
        </div>  
    </div>
</template>
<script>

import axios from 'axios'
import { BASE_API_URL, BASE_MOVIE_SERVICE } from '@/shared/config'
import AppLocationMap from './AppLocationMap.vue'
import router from '../router'

export default {
    components: {
        AppLocationMap
    },
    data() {
        return {
            movieId: this.$route.params.id,
            movie: Object,
        };
    },
    async created() {
        await axios.get(BASE_API_URL + BASE_MOVIE_SERVICE + "/" + this.movieId).then(response => {
            if (!response.data.isPublished && this.$store.state.isAdmin === null || this.$store.state.isAdmin === false) {
                router.push({ path: '/404' });
            } else {
                this.movie = response.data;
            }
        }).catch((error) => {
            router.push({ path: '/404' });
        });
    }
}
</script>
<style scoped>
p {
    font-weight: bold;
    max-width: 350px;
}

.locationContent {
    overflow-wrap: anywhere;
    width: 98%;
    justify-content: space-evenly;
    padding: 0 0 20px 0;
    height: auto;
    display: flex;
    flex-wrap: wrap;
}

.tidbit {
    font-style: italic;
}

@media (max-width: 850px) {
    .locationContent {
        overflow-wrap: anywhere;
        display: block;
        width: 98%;
        padding: 0 0 20px 0;
        height: auto;
    }
}

.unknownBlock, .fictionalBlock {
    width: 350px;
    height: 350px;
    border: 1px dashed black;
    background-color: whitesmoke;
}

@media (max-width: 850px) {
    .unknownBlock, .fictionalBlock {
        overflow-wrap: anywhere;
        display: block;
        width: 98%;
        padding: 0 20px 30px 20px;
        height: auto;
    }
}

.locationSq {
    padding: 20px 50px 20px 50px;
    margin: 10px 10px 10px 10px;
    border: 1px solid black;
    border-radius: 8px;
}    
</style>