<template>
    <div>
        <h1>Add Movie</h1>
        <div class="row form-group">   
            <div class="col d-flex justify-content-center">
                <input type="text" class="form-control" placeholder="title" v-model="movie.title" id="movieTitle" :disabled="this.movieIsConfirmed" @focus="resetMovieForm()">
                <input type="text" class="form-control" placeholder="year" v-model="movie.yearOfRelease" id="yearOfRelease" maxlength="4" size="4" :disabled="this.movieIsConfirmed" @focus="resetMovieForm()">
            </div>
        </div>
        <div class="row form-group">
            <div class="col d-flex justify-content-center">
                <input type="text" class="form-control" placeholder="director" v-model="movie.director" id="director" :disabled="this.movieIsConfirmed" @focus="resetMovieForm()">
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
        <div class="alert alert-warning" v-show="this.movieSuccessfullyAdded === false">
                        This movie already exists.
        </div>
        <div v-if="this.movieIsConfirmed">        
            <h1>Locations for {{ this.createdMovieTitle }} ({{ this.createdMovieYearOfRelease }})</h1>
            <div v-for="(location, index) in locationsAdded" :key="index">
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
                <div class="col d-flex justify-content-center locationExists">
                    <div>
                        <label>Location does not exist</label>
                    </div>
                    <div>
                        <input type="checkbox" name="isFictional" id="isFictional" v-model="location.isFictional" :checked="location.isFictional">
                    </div>
                </div>
                <br />
                <div>
                    <div v-if="!location.isFictional">
                        <div class="row form-group">
                            <div class="col d-flex justify-content-center">
                                <h5>Address</h5>
                            </div>
                        </div>
                        <div>
                            <div class="row form-group">
                                <label>Address is unknown</label>
                                <input type="checkbox" name="isUnknown" id="isUnknown" v-model="location.isUnknown" :checked="location.isUnknown">
                            </div>
                        </div>
                        <div id="fieldContainer">
                            <div class="row form-group address-fields">
                                <div class="col">
                                    <label for="houseNumber">House Number: </label>
                                    <div>
                                        <input type="text" id="houseNumber" name="houseNumber" v-model="location.address.houseNumber" :disabled="location.isUnknown">
                                    </div>
                                </div>
                                <div class="col">
                                    <label for="streetName">Street Name: </label>
                                    <div>
                                        <input type="text" id="streetName" name="streetName" v-model="location.address.streetName" :disabled="location.isUnknown">
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group address-fields">
                                <div class="col">
                                    <label for="coordinates">Coordinates: </label>
                                    <div>
                                        <input type="text" id="coordinates" name="coordinates" v-model="location.address.coordinates" :disabled="location.isUnknown">
                                    </div>
                                </div>
                                <div class="col">
                                    <label for="city">City: </label>
                                    <div>
                                        <input type="text" id="city" name="city" v-model="location.address.city" :disabled="location.isUnknown">
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group address-fields">
                                <div class="col">
                                    <label for="territory">Territory: </label>
                                    <div>
                                        <input type="text" id="territory" name="territory" v-model="location.address.territory" :disabled="location.isUnknown">
                                    </div>
                                </div>
                                <div class="col">
                                    <label for="country">Country: </label>
                                    <div>
                                        <select name="select" v-model="location.address.country" :disabled="location.isUnknown">
                                            <option></option>
                                            <option v-for="country in countries['countries']" :key="country.id">{{ country.nameWithCapital }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div class="row form-group">
                        <label for="note">Note (if needed)</label>
                        <div class="col d-flex justify-content-center">
                            <textarea id="locationNote" name="locationNote" rows="2" cols="40" placeholder="note" v-model="location.note"></textarea>
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
            <br />
            <div class="alert alert-success" v-show="this.locationsSuccessfullyAdded === true">
                        Locations successfully added!
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import { BASE_API_URL, BASE_MOVIE_SERVICE, BASE_LOCATION_SERVICE } from '@/shared/config'
import router from '../../router'

const COUNTRIES = require('../../utilityspecs/countries.json');

export default {
    data() {
        return {
            movie: {
                title: null,
                yearOfRelease: null,
                director: null,
                isPublished: false
            },
            locationsAdded:[],
            countries: JSON.parse(JSON.stringify(COUNTRIES)),
            movieIsConfirmed: false,
            createdMovieId: null,
            createdMovieTitle: null,
            createdMovieYearOfRelease: null,
            selectedCountry: undefined,
            movieSuccessfullyAdded: Boolean,
            locationsSuccessfullyAdded: Boolean
        }
    },
    beforeCreate() {
        if (this.$store.state.isAdmin === null || this.$store.state.isAdmin === false) {
            router.push({ path: '/404'});
        }
    },
    methods: {
        async saveMovie() {
            await axios.post(BASE_API_URL + BASE_MOVIE_SERVICE + "/addmovie", this.movie, {
                headers: {
                    "Authorization": `Bearer ${this.$store.state.token}`
                }
            }).then(response => {
                if (response.status === 204) {
                    this.movieSuccessfullyAdded = false;
                } else {
                    this.movieSuccessfullyAdded = true;
                    this.createdMovieId = response.data.id;
                    this.createdMovieTitle = response.data.title;
                    this.createdMovieYearOfRelease = response.data.yearOfRelease;
                    this.movieIsConfirmed = true;
                }
            }).catch((error) => {
                throw(error);
            });
        },
        async updateLocations() {
            await axios.put(BASE_API_URL + BASE_LOCATION_SERVICE + "/updatelocations/" + this.createdMovieId, this.locationsAdded)
                       .catch((error) => {
                throw(error);
            });
            this.locationsSuccessfullyAdded = true;
            setTimeout(function() {
                    router.push({ path: '/'});
            }, 3000);
        },
        addLocation() {
            this.locationsAdded.push({
                    description: null,
                    address: {
                        houseNumber: null,
                        streetName: null,
                        coordinates: null,
                        city: null,
                        territory: null,
                        country: null
                    },
                    movie: this.movie,
                    isFictional: false,
                    isUnknown: false
                })
        },
        updateIsUnknown(locationIndex) {
            let location = this.locationsAdded[locationIndex];
            if (this.locationFormIsEmpty(location)) {
                location.isUnknown = true;
            } else {
                location.isUnknown = false;
            }
        },
        resetMovieForm() {
            this.movieSuccessfullyAdded = undefined;
        },
    }
}
</script>

<style scoped>
.locationExists {
    justify-content: space-around !important;
}

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