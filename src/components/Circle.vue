<template>
  <circle
    :cx="cx"
    :cy="cy"
    :r="r"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  ></circle>
</template>

<script>
export default {
  name: "item-circle",
  props: ["hovered", "cx", "cy", "r"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
circle {
  cursor: pointer;
  fill: transparent;
  stroke-width: 1;
  stroke: black;
  transition: fill 0.2s;
}
circle:hover {
    fill: lightgray;
  }
</style>
