<template>
    <div>
        <h1>Find by location</h1>
        <ul>
            <li v-for="country in countries" :key="country.id">
                {{ country.name }}
            </li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios'
import { BASE_API_URL } from '@/shared/config'

export default {
    
    data() {
        return {
            countries: []
        }
    },    
    async created() {
        
    }
}
</script>

<style>
    
</style>