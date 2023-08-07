<template>
    <div>
        <h1>Edit Movie</h1>
        <div class="row form-group">   
            <div class="col d-flex justify-content-center">
                <input type="text" class="form-control" placeholder="title" v-model="this.movie.title" id="movieTitle" disabled="true">
                <input type="text" class="form-control" placeholder="year" v-model="this.movie.yearOfRelease" id="yearOfRelease" maxlength="4" size="4" disabled="true">
            </div>
        </div>
        <div class="row form-group">
            <div class="col d-flex justify-content-center">
                <input type="text" class="form-control" placeholder="director" v-model="this.movie.director" id="director" disabled="true">
                <div>
                    <label for="isPublished">Is Published</label>
                    <input type="checkbox" name="isPublished" v-model="this.movie.isPublished" id="isPublished" value="published" :checked="movie.isPublished" :disabled="this.movieSaved === true">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col d-flex justify-content-center">
                <form @submit.prevent="saveMovie()">
                    <input type="submit" value="Save Movie" :disabled="this.movieSaved === true">
                </form>
            </div>
        </div>
        <div class="alert alert-success" v-show="this.movieSaved === true">
                        This movie has been successfully updated.
        </div>
        <div>        
            <h1>Locations for {{ this.movie.title }} ({{ this.movie.yearOfRelease }})</h1>
            <div v-for="(location, index) in this.movie.locations" :key="index">
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
                                    <input type="text" id="streetName" name="streetName" v-model="location.address.streetName"  :disabled="location.isUnknown">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group address-fields">
                            <div class="col">
                                <label for="coordinates">Coordinates: </label>
                                <div>
                                    <input type="text" id="coordinates" name="coordinates" v-model="location.address.coordinates"  :disabled="location.isUnknown">
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
                    </div>
                </div>
                <hr />
            </div>
            <div class="row form-group">
                <div class="col d-flex justify-content-center">
                    <input type="button" @click="addLocation()" value="Add Location">
                    <form @submit.prevent="updateLocations" method="put">
                        <input type="submit" value="Save Changes">
                    </form>
                </div>
            </div>
            <br />
            <div class="alert alert-success" v-show="this.locationsSuccessfullyUpdated === true">
                        Locations successfully updated!
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
            movieId: this.$route.params.id,
            movie: Object,
            countries: JSON.parse(JSON.stringify(COUNTRIES)),
            movieIsConfirmed: false,
            movieSaved: Boolean,
            locationsSuccessfullyUpdated: Boolean
        }
    },
    async created() {
        await axios.get(BASE_API_URL + BASE_MOVIE_SERVICE + "/" + this.movieId).then(response => {
            this.movie = response.data;
        }).catch((error) => {
            throw(error);
        });
    },
    methods: {
        async saveMovie() {
            await axios.put(BASE_API_URL + BASE_MOVIE_SERVICE + "/updatemovie/" + this.movieId, this.movie).catch((error) => {
                throw(error);
            });
            this.movieSaved = true;
            setTimeout(function () {
                this.movieSaved = false;
            }, 3000);
        },
        async updateLocations() {
            await axios.put(BASE_API_URL + BASE_LOCATION_SERVICE + "/updatelocations/" + this.movieId, this.movie.locations).catch((error) => {
                throw(error);
            });
            this.locationsSuccessfullyUpdated = true;
            setTimeout(function () {
                router.push({ path: '/' });
            }, 3000);
        }
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