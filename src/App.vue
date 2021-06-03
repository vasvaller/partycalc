<template>
  <header-vue></header-vue>
  <calculator></calculator>
</template>

<script>
import HeaderVue from "./components/Header.vue";
import Calculator from "./components/Calculator.vue";

export default {
  name: "App",
  components: { Calculator, HeaderVue },
};
</script>

<style lang="scss">
@import "./src/styles/_commons.scss";
@import "./src/styles/_variables.scss";

body {
  padding: 0;
  margin: 0;
  // font-family: "Courier New", Courier, monospace;
  color: white;
  background: $second;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
}

ul {
  list-style: none;
  display: flex;
  width: 200px;
  justify-content: space-between;
}

section {
  padding: 0 30px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
}

.center {
  text-align: center;
}

.container {
  width: min-content;
  padding: 30px;
  border-radius: 20px;
  border: 2px solid $prime;
}

table {
  margin-bottom: 30px;
}

hr {
  border: none;
  height: 1px;
  background-color: $prime;
}

.separator {
  margin-bottom: 30px;
}
</style>
