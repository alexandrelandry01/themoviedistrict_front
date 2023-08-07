<template>
    <div>
        <h1>{{ this.formatArea(this.territory) }}</h1>
        <br />
        <br />
        <ul>
            <li v-for="movie in movies" :key="movie.id">
                <router-link :to="'/movies/' + movie.id">{{ movie.title + ' ' + '(' + movie.yearOfRelease + ')'}}</router-link>
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
            territory: this.$route.params.territory,
            listOfCountries: JSON.stringify(COUNTRIES),
            listOfTerritories: null,
            movies: []
        }
    },
    async created() {
        console.log("type is : " + typeof this.countryName);
        if (this.isCanadaUSOrUK(this.countryName)) {
            this.setListOfTerritories(this.countryName);
            console.log(JSON.stringify(this.listOfTerritories));
            if (this.isNotNullOrEmpty(this.territory) && this.listOfTerritories.includes(this.formatArea(this.territory))) {
                await axios.get(BASE_API_URL + BASE_MOVIE_SERVICE + "/findbycountry/" + this.countryName + "/" + this.territory).then(
                    response => {
                        this.movies = response.data;
                }).catch((error) => {
                    throw(error);
                });
            } else if (this.isNotNullOrEmpty(this.territory) && !this.listOfTerritories.includes(this.formatArea(this.territory))) {
                router.push({ path: "/404" });
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
        setListOfTerritories(country) {
            switch(country) {
                case 'canada':
                    this.listOfTerritories = JSON.stringify(CA_PROVINCES);
                    break;
                case 'united states':
                    this.listOfTerritories = JSON.stringify(US_TERRITORIES);
                    break;
                case 'united kingdom':
                    this.listOfTerritories = JSON.stringify(UK_TERRITORIES);
                    break;
                default: 
            }
        }
    }
    
}
</script>
<style>
    
</style>