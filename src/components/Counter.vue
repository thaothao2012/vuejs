<template>
  <div class="hello" style="margin-top: 20px">
    <div class="form-group">
      <input type="text" class="form-control" aria-describedby="helpId" v-bind:value="count" readonly/>
      <button type="button" class="btn btn-primary" v-on:click="count++">Counter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      count: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
