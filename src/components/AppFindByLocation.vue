<template>
    <div>
        <h1>Find by location</h1>
        <ul>
            <li v-for="country in countries" :key="country.id">
                {{ country.name }}
            </li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios'
import { BASE_API_URL, BASE_COUNTRY_SERVICE } from '@/shared/config'

export default {
    
    data() {
        return {
            countries: []
        }
    },    
    async created() {
        const listOfCountries = await axios.get(BASE_API_URL + BASE_COUNTRY_SERVICE).then(response => {
            this.countries = response.data;
        }).catch((error) => {
            console.log(error);
            throw(error);
        });
    }
}
</script>

<style>
    
</style>