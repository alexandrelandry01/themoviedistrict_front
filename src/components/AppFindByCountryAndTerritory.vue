<template>
    <div v-if="this.urlIsValid">
        <h1>{{ this.formatArea(this.territory) }}</h1>
        <br />
        <br />
        <ul>
            <li v-for="movie in movies" :key="movie.id">
                <div v-if="movie.isPublished">
                    <router-link :to="'/movies/' + movie.id">{{ movie.title + ' ' + '(' + movie.yearOfRelease + ')'}}</router-link>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

import axios from 'axios'
import { BASE_API_URL, BASE_MOVIE_SERVICE, BASE_LOCATION_SERVICE } from '@/shared/config'
import router from '../router'

const CA_PROVINCES = require('../utilityspecs/caprovinces.json');
const US_TERRITORIES = require('../utilityspecs/usterritories.json');
const UK_TERRITORIES = require('../utilityspecs/ukterritories.json');
const EMPTY_SPACE = ' ';

export default {
    data() {
        return {
            countryName: this.$route.params.country.toLowerCase(),
            territory: this.$route.params.territory.toLowerCase(),
            movies: [],
            allowedTerritories: null,
            urlIsValid: false
        }
    },
    async created() {
        await axios.get(BASE_API_URL + BASE_LOCATION_SERVICE + '/' + this.countryName).then(response => {
            this.allowedTerritories = response.data;
            if (!this.allowedTerritories.includes(this.formatArea(this.territory))) {
                router.push({ path: "/404" });
            } else {
                this.urlIsValid = true;
            }
        });

        if (this.isCanadaUSOrUK(this.countryName)) {
            if (this.isNotNullOrEmpty(this.territory) && this.allowedTerritories.includes(this.formatArea(this.territory))) {
                await axios.get(BASE_API_URL + BASE_MOVIE_SERVICE + "/findbycountry/" + this.countryName + "/" + this.territory).then(
                    response => {
                        this.movies = response.data;
                }).catch((error) => {
                    throw(error);
                });
            }
        }
    },
    methods: {
        formatArea(area) {
            if (area.indexOf(EMPTY_SPACE) !== -1) {
                var split = area.split(EMPTY_SPACE);
                return split.at(0).charAt(0).toUpperCase() + split.at(0).slice(1) + ' ' + 
                       split.at(1).charAt(0).toUpperCase() + split.at(1).slice(1);
            } else {
                return area.charAt(0).toUpperCase() + area.slice(1);
            }
        },
        isCanadaUSOrUK(country) {
            return country === 'canada' || country === 'united states' || country === 'united kingdom';
        },
        isNotNullOrEmpty(value) {
            return (typeof value !== 'undefined') && value !== null && value !== '';
        },
    }    
}
</script>
<style>
    
</style>