<template>
  <header>
    <div class="wrapper">
      <h1 class="logo">PARTYCALC</h1>
      <ul :class="{ invisible: !isMenuVisible }">
        <li class="btn">Main</li>
        <li class="btn">About</li>
        <li class="btn">Contacts</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuVisible: false,
    };
  },
};
</script>

<style lang="scss">
@import "./src/styles/_variables.scss";

header {
  padding: 0 30px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.171);
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  min-width: max-content;
}

.logo {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
