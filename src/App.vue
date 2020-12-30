<template>
  <body>
    <router-view :key="$route.fullPath"/>
  </body>
</template>

<script>
  export default {};
</script>

<style>
  body {
    font-family: "Raleway", sans-serif;
    margin:0;
    max-width: 1300px;
  }

  h1 {
    font-family:  'Patrick Hand', cursive;
    text-align: center;
    color: #2c3e50;
  }

   img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

 
</style>
