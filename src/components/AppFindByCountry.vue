<template>
    <div>
        <h1>{{ this.formatArea(this.countryName) }}</h1>
        <img :src="require('../assets/flags/' + this.countryName + '.png')"/>
        <br />
        <br />
        <ul v-if="!this.isCanadaUSOrUK(this.countryName)">
            <li v-for="movie in movies" :key="movie.id">
                <router-link :to="'/movies/' + movie.id">{{ movie.title + ' ' + '(' + movie.yearOfRelease + ')'}}</router-link>
            </li>
        </ul>
        <ul v-if="this.isCanadaUSOrUK(this.countryName)">
            <li v-for="territory in this.listOfTerritories['territories']" :key="territory.id">
                <router-link :to="`/movies/findbycountry/${this.countryName}/${territory.name}`">{{ territory.nameWithCapital }}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>

import axios from 'axios'
import { BASE_API_URL, BASE_MOVIE_SERVICE } from '@/shared/config'
import router from '../router'

const COUNTRIES = require('../utilityspecs/countries.json');
const CA_PROVINCES = require('../utilityspecs/caprovinces.json');
const US_TERRITORIES = require('../utilityspecs/usterritories.json');
const UK_TERRITORIES = require('../utilityspecs/ukterritories.json');
const EMPTY_SPACE = ' ';

export default {
    data() {
        return {
            countryName: this.$route.params.country,
            listOfCountries: JSON.stringify(COUNTRIES),
            listOfTerritories: null,
            movies: []
        }
    },
    async created() {
        if (this.isCanadaUSOrUK(this.countryName)) {
            this.setListOfTerritories(this.countryName);
        } else {
            await axios.get(BASE_API_URL + BASE_MOVIE_SERVICE + "/findbycountry/" + this.countryName).then(response => {
            if (this.listOfCountries.includes(this.formatArea(this.countryName))) {
                this.movies = response.data;
            } else {
                router.push({ path: "/404" });
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
        isCanadaUSOrUK(country) {
            return country === 'canada' || country === 'united states' || country === 'united kingdom';
        },
        isNotNullOrEmpty(value) {
            return (typeof value !== 'undefined') && value !== null && value !== '';
        },
        setListOfTerritories(country) {
            switch(country) {
                case 'canada':
                    this.listOfTerritories = JSON.parse(JSON.stringify(CA_PROVINCES));
                    break;
                case 'united states':
                    this.listOfTerritories = JSON.parse(JSON.stringify(US_TERRITORIES));
                    break;
                case 'united kingdom':
                    this.listOfTerritories = JSON.parse(JSON.stringify(UK_TERRITORIES));
                    break;
                default: 
            }
        }
    }
    
}
</script>
<style>
    
</style>