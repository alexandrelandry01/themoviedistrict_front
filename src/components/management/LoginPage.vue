<template>
    <div>
        <h2>Login</h2>
        <br />
        <form>
            <div class="form-outline mb-4">
                <input type="email" id="username" v-model="this.credentials.username" class="form-control inputField" @focus="resetFormStatus()"/>
                <label class="form-label" for="username">Username</label>
            </div>
            <div class="form-outline mb-4">
                <input type="password" id="password" v-model="this.credentials.password" class="form-control inputField" @focus="resetFormStatus()"/>
                <label class="form-label" for="password">Password</label>
            </div>
            <button type="button" class="btn btn-primary btn-block mb-4" @click="login()">Sign in</button>
        </form>
        <br />
        <div class="alert alert-warning" v-show="this.fieldsAreNotFilled === true">
            Please enter a username and a password
        </div>
        <div class="alert alert-warning" v-show="this.credentialsAreValid === false">
            Credentials are not valid. Try again.
        </div>
        <div class="alert alert-warning" v-show="this.accountHasBeenLocked === true">
            Due to too many failed login attempts, this account has been locked. Try again later.
        </div>
    </div>
</template>
<script>

import { BASE_API_URL, BASE_ACCOUNT_SERVICE } from '@/shared/config'
import axios from 'axios'
import router from '../../router'

export default {
    data() {
        return {
            credentialsAreValid: Boolean,
            fieldsAreNotFilled: Boolean,
            accountHasBeenLocked: Boolean,
            credentials: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            if (this.fieldsNotFilled()) {
                this.fieldsAreNotFilled = true;
            } else {
                this.credentialsAreValid = undefined;
                await axios.post(BASE_API_URL + BASE_ACCOUNT_SERVICE + "/login", this.credentials).then(response => {
                this.$store.commit('SET_USER', response.data.userName);
                this.$store.commit('SET_TOKEN', response.data.token);
                this.$store.commit('SET_IS_ADMIN', response.data.isAdmin);
                this.credentialsAreValid = true;
                this.fieldsAreNotFilled = false;
                setTimeout(function() {
                    router.push({ path: '/'});
                }, 1000);
                }).catch((error) => {
                    if (error.response.status === 401) {
                        this.credentialsAreValid = false;
                    } else if (error.response.status === 403) {
                        this.accountHasBeenLocked = true;
                    }
                });
            }        
        },
        fieldsNotFilled() {
            return this.credentials.username.trim().length === 0 && this.credentials.password.trim().length === 0;
        },
        resetFormStatus() {
            this.credentialsAreValid = undefined;
            this.fieldsAreNotFilled = false;
            this.accountHasBeenLocked = undefined;
        }
    }
}
</script>

<style scoped>
.inputField {
    width: 20%;
    margin: auto;
}    
</style>