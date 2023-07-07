<template>
    <div>
        <h1>Add Movie</h1>
        <div class="row form-group">   
            <div class="col d-flex justify-content-center">
                <input type="text" class="form-control" placeholder="title" v-model="movie.title" id="movieTitle" :disabled="this.movieIsConfirmed">
                <input type="text" class="form-control" placeholder="year" v-model="movie.yearOfRelease" id="yearOfRelease" maxlength="4" size="4" :disabled="this.movieIsConfirmed">
            </div>
        </div>
        <div class="row form-group">
            <div class="col d-flex justify-content-center">
                <input type="text" class="form-control" placeholder="director" v-model="movie.director" id="director" :disabled="this.movieIsConfirmed">
                <div>
                    <label for="isPublished">Is Published</label>
                    <input type="checkbox" name="isPublished" v-model="movie.isPublished" id="isPublished" value="published" :checked="movie.isPublished" :disabled="this.movieIsConfirmed">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col d-flex justify-content-center">
                <form @submit.prevent="saveMovie()">
                    <input type="submit" value="Save Movie" :disabled="this.movieIsConfirmed">
                </form>
            </div>
        </div>
        <div v-if="this.movieIsConfirmed">        
            <h1>Locations for {{ this.createdMovieTitle }} ({{ this.createdMovieYearOfRelease }})</h1>
            <div v-for="(location, index) in locationsAdded.locations" :key="index">
                <div class="row form-group">
                    <div class="col d-flex justify-content-center">
                        <span>Location #{{ ++index }}</span>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col d-flex justify-content-center">
                        <textarea id="locationDescription" name="locationDescription" rows="4" cols="40" placeholder="description of location..." v-model="location.description"></textarea>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col d-flex justify-content-center">
                        <h5>Address</h5>
                    </div>
                </div>
                <div id="fieldContainer">
                    <div class="row form-group address-fields">
                        <div class="col">
                            <label for="houseNumber">House Number: </label>
                            <div>
                                <input type="text" id="houseNumber" name="houseNumber" v-model="location.address.houseNumber">
                            </div>
                        </div>
                        <div class="col">
                            <label for="streetName">Street Name: </label>
                            <div>
                                <input type="text" id="streetName" name="streetName" v-model="location.address.streetName">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group address-fields">
                        <div class="col">
                            <label for="coordinates">Coordinates: </label>
                            <div>
                                <input type="text" id="coordinates" name="coordinates" v-model="location.address.coordinates">
                            </div>
                        </div>
                        <div class="col">
                            <label for="city">City: </label>
                            <div>
                                <input type="text" id="city" name="city" v-model="location.address.city">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group address-fields">
                        <div class="col">
                            <label for="territory">Territory: </label>
                            <div>
                                <input type="text" id="territory" name="territory" v-model="location.address.territory">
                            </div>
                        </div>
                        <div class="col">
                            <label for="country">Country: </label>
                            <div>
                                <select name="select">
                                    <option>Select</option>
                                    <option v-for="country in countries" :key="country.id">{{ country.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div class="row form-group">
                <div class="col d-flex justify-content-center">
                    <input type="button" @click="addLocation()" value="Add Location">
                    <form @submit.prevent="updateLocations" method="put">
                        <input type="submit" value="Publish">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import { BASE_API_URL, BASE_MOVIE_SERVICE, BASE_COUNTRY_SERVICE } from '@/shared/config'
import router from '../../router'

export default {
    data() {
        return {
            movie: {
                title: null,
                yearOfRelease: null,
                director: null,
                isPublished: true,
                locations: []
            },
            locationsAdded: {
                locations: []
            },
            countries: [],
            movieIsConfirmed: false,
            createdMovieId: null,
            createdMovieTitle: null,
            createdMovieYearOfRelease: null
        }
    },
    async created() {
        const listOfCountries = await axios.get(BASE_API_URL + BASE_COUNTRY_SERVICE).then(response => {
            this.countries = response.data;
        }).catch((error) => {
            console.log(error);
            throw(error);
        });
    },
    methods: {
        async saveMovie() {
            await axios.post(BASE_API_URL + BASE_MOVIE_SERVICE + "/addmovie", this.movie).then(response => {
                this.createdMovieId = response.data.id;
                this.createdMovieTitle = response.data.title;
                this.createdMovieYearOfRelease = response.data.yearOfRelease;
                this.movieIsConfirmed = true;
            }).catch((error) => {
                console.log(error);
                throw(error);
            });
        },
        async updateLocations() {
            console.log("val = " + JSON.stringify(this.locationsAdded));
            await axios.put(BASE_API_URL + BASE_MOVIE_SERVICE + "/updatelocations/" + this.createdMovieId, this.locationsAdded).then(response => {
                console.log("succes");
            }).catch((error) => {
                console.log(error);
                throw(error);
            });
            setTimeout(function() {
                    router.push({ path: '/'});
                }, 3000);
        },
        addLocation() {
            this.locationsAdded.locations.push({
                    description: null,
                    address: {
                        houseNumber: null,
                        streetName: null,
                        coordinates: null,
                        city: null,
                        territory: null,
                        country: null
                    },
                    movie: this.movie
                })
        }
    }  
}
</script>
<style scoped>
.form-group {
    padding: 0 0 10px 0;
}

#movieTitle, #yearOfRelease, #director, #isPublished {
    width: auto;
    margin: 0 0 0 1%;
}

input[type=text] {
    width: auto;
}

form {
    padding-left: 20px;
}

#fieldContainer {
    display: inline-grid;
}

.address-fields {
    display: inline-flex;

}
</style>