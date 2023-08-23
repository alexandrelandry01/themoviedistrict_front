<template>
    <div v-if="this.$store.state.user !== null">
        Logged in as {{ this.$store.state.user }}
        <br />
        <input type="button" @click="logout()" value="logout">
    </div>
</template>
<script>

import router from '../router'

export default {
    name: 'AppLogout',
    methods: {
        logout() {
            this.$store.commit('SET_USER', null);
            this.$store.commit('SET_TOKEN', null);
            this.$store.commit('SET_IS_ADMIN', null);
            setTimeout(function() {
                    router.push({ path: '/'});
            }, 3000);
        }
    }
}
</script>

<style>
    
</style>