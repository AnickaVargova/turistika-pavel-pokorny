<template>
  <body>
    <router-view :key="$route.fullPath" />
  </body>
</template>

<script>
  export default {};
</script>

<style>
  body {
    font-family: "Libre Baskerville", serif;
    margin: 0;
  }

  h1,
  .podnadpis {
    font-family: "Patrick Hand", cursive;
    text-align: center;
    color: #2c3e50;
  }

  .special {
    color: #672d73;
  }

  .podnadpis {
    margin: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
