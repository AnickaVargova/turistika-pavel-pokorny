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
  }

  h1 {
    font-family:  'Patrick Hand', cursive;
    text-align: center;
    color: #2c3e50;
  }

 
</style>
