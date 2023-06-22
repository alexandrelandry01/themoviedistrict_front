<template>
    <div class="container-fluid">        
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'MainContent',
    components: {
    
    }    
}
</script>

<style>
.container-fluid {
    background-color: mediumspringgreen;
    padding: 2% 0 2% 0;
}
</style>