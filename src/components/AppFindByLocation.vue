<template>
    <div>
        <h1>Find by location</h1>
        <ul>
            <li v-for="country in this.countries['countries']" :key="country.id">
                <router-link :to="'/movies/findbycountry/' + country.name">{{ country.nameWithCapital }}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>

const COUNTRIES = require('../utilityspecs/countries.json');

export default {
    
    data() {
        return {
            countries: JSON.parse(JSON.stringify(COUNTRIES))
        }
    },
}
</script>

<style>
    
</style>