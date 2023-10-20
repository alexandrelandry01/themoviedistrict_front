<template>
    <div v-if="this.urlIsValid">
        <h1>{{ this.formatArea(this.countryName) }}</h1>
        <img :src="require('../assets/flags/' + this.trimArea(this.countryName) + '.png')"/>     
        <br />
        <br />
        <ul v-if="!this.isCanadaUSOrUK(this.countryName)">
            <li v-for="movie in movies" :key="movie.id">
                <div v-if="movie.isPublished">
                    <router-link :to="'/movies/' + movie.id">{{ movie.title + ' ' + '(' + movie.yearOfRelease + ')'}}</router-link>
                </div>
            </li>
        </ul>
        <ul v-if="this.isCanadaUSOrUK(this.countryName)">
            <li v-for="territory in this.listOfTerritories" :key="territory.id">
                <router-link :to="`/movies/findbycountry/${this.countryName}/${territory.toLowerCase()}`">{{ territory }}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>

import axios from 'axios'
import { BASE_API_URL, BASE_MOVIE_SERVICE, BASE_LOCATION_SERVICE } from '@/shared/config'
import router from '../router'

const EMPTY_SPACE = ' ';

export default {
    data() {
        return {
            countryName: this.$route.params.country.toLowerCase(),
            listOfTerritories: null,
            movies: [],
            allowedCountries: null,
            urlIsValid: false
        }
    },
    async created() {
        await axios.get(BASE_API_URL + BASE_LOCATION_SERVICE + '/countries').then(response => {
            this.allowedCountries = response.data;
            if (!this.allowedCountries.includes(this.formatArea(this.countryName))) {
                router.push({ path: "/404" });
            } else {
                this.urlIsValid = true;
            }
        });

        if (this.isCanadaUSOrUK(this.countryName)) {
            await axios.get(BASE_API_URL + BASE_LOCATION_SERVICE + '/' + this.countryName).then(response => {
                    this.listOfTerritories = response.data;
            });
        } else {
            await axios.get(BASE_API_URL + BASE_MOVIE_SERVICE + "/findbycountry/" + this.countryName).then(response => {
                if (this.allowedCountries.includes(this.formatArea(this.countryName))) {
                    this.movies = response.data;
                }
            }).catch((error) => {
                throw(error);
            });
        }
    },
    methods: {
        formatArea(country) {
            if (country.indexOf(EMPTY_SPACE) !== -1) {
                var split = country.split(EMPTY_SPACE);
                return split.at(0).charAt(0).toUpperCase() + split.at(0).slice(1) + ' ' + 
                       split.at(1).charAt(0).toUpperCase() + split.at(1).slice(1);
            } else {
                return country.charAt(0).toUpperCase() + country.slice(1);
            }
        },
        trimArea(country) {
            if (country.indexOf(EMPTY_SPACE) !== -1) {
                return country.replace(/\s/g, '');
            } else {
                return country;
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