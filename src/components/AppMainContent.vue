<template>
    <div class="container-fluid">        
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'MainContent'
}
</script>

<style>
.container-fluid {
    border: 1px solid black;
    padding: 2% 0 2% 0;
    border-radius: 0 0 5px 5px;
}
</style>