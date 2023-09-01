<!-- eslint-disable vue/no-unused-components -->
<template>
  <!-- TODO : Add new img for header <img alt="" src="./assets/logo.png"> -->
  <div class="row">
    <AppNavbar></AppNavbar>
  </div>
  <div class="row">
    <div class="col-md-9 nopadding">
      <AppMainContent></AppMainContent>
    </div>
    <div class="col-md-3 nopadding">
      <AppSidebar></AppSidebar>
    </div>
  </div>
  <div class="row">
    <div class="col-9">
      <AppLogout></AppLogout>
    </div>
    <div class="col-3">
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import AppMainContent from './components/AppMainContent.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppLogout from './components/AppLogout.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppMainContent,
    AppSidebar,
    AppLogout
  }
}
</script>

<style>
.nopadding {
  padding: 0 !important;
}

a {
  text-decoration: none !important;
}

#app {
  font-family: Georgia, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
