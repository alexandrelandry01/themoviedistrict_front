<template>
    <div>
        <h1>Find by location</h1>
        <ul>
            <li v-for="country in this.countries" :key="country.id">
                <router-link :to="'/movies/findbycountry/' + country.toLowerCase()">{{ country }}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>

import axios from 'axios'
import { BASE_API_URL, BASE_LOCATION_SERVICE } from '@/shared/config'

export default {
    
    data() {
        return {
            countries: []
        }
    },
    async created() {
        await axios.get(BASE_API_URL + BASE_LOCATION_SERVICE + '/countries').then(response => {
            this.countries = response.data;
        });
    }
}
</script>

<style>
    
</style>