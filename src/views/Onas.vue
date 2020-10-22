<template>
  <div id="onas">
    <div id="pozadi1">
      <img src="./../assets/drevo.jpg" alt="hory" />
    </div>

    <div id="transbox1"></div>

     <router-link id="domuOnas" to="/">
          <div class="cestyKategorie">Domů</div>
        </router-link>

    <h1>O nás</h1>
    
      <div id="foto"><img src="@/assets/hikers.jpg" alt="portret" /></div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum velit
        dolore, iste aut odio ea in vero fuga, magni, deserunt voluptatem
        distinctio! Mollitia vitae ullam, vel alias excepturi minima veniam?
      </p>
    
    <a id="kontakt" href="mailto:someone@example.com?Subject=Pozdrav"
      >Kontakt</a
    >
  </div>
</template>

<script>
  export default {};
</script>

<style>

  #onas {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
  }

  #onas #transbox1 {
    background-color: rgba(220, 241, 229, 0.8);
  }


  #onas h1 {
    grid-column: 3/5;
    grid-row: 1/3;
  }

  #domuOnas {
    margin: 5%;
    width: 50%;
    grid-column: 1/3;
    grid-row: 1/3;
  }

  #foto {
    grid-column: 1/3;
    grid-row: 3/7;
    border: 2px solid black;
    margin: 5%;  
  }

  #onas p {
  grid-column: 3/7;
  grid-row: 3/5;
  font-size: 20px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #kontakt {
    grid-column: 3/7;
    grid-row: 6/7;
    margin-left: 5%;
    margin-right: 5%;
    font-size: 30px;
    color: rgb(23, 59, 37);
    text-decoration: underline;
  }

  #kontakt:hover,
  #kontakt:active {
    color: darkolivegreen;
  }
</style>
