<template>
  <div id="app">
    <nav class="nav justify-content-center">
      <router-link to="/counter">Counter</router-link>
      <router-link to="/circle">Draw Circle</router-link>
    </nav>
    <router-view></router-view>
    <!-- <Counter /> -->
  </div>
</template>

<script>
// import Counter from "./components/Counter.vue";

export default {
  name: "app",
  // components: {
  //   Counter
  // }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav > a:nth-child(2){
    margin-left: 10px;
}
</style>
