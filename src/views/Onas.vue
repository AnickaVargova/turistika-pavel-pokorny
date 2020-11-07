<template>
  <div id="onas">
    <div id="pozadi1">
      <img src="./../assets/bileTahy.jpg" alt="Pozadí" />
    </div>

    <div id="transbox1"></div>

    <router-link class="kontejnerDomuOnas" to="/">
      <div class="pomnicekKategorie" id="domuOnas">Domů</div>
    </router-link>

    <h1>O nás</h1>

    <div id="foto"><img src='@/assets/hikers.jpg' alt="My na cestách" /></div>
    <p>
      Tady bude text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum velit
      dolore, iste aut odio ea in vero fuga, magni, deserunt voluptatem
      distinctio! Mollitia vitae ullam, vel alias excepturi minima veniam?
    </p>

    <a id="kontakt" href="mailto:pokorny.pavel1@centrum.cz?Subject=Pozdrav"
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
    background-color: rgba(220, 241, 229, 0.6);
  }

  .kontejnerDomuOnas {
    grid-column: 1/3;
    grid-row: 1/3;
  }

  #onas h1 {
    grid-column: 1/7;
    grid-row: 2/3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
  }

  #domuOnas {
    margin: 20px;
    width: 80px;
    height: 20px;

    background-color: mediumturquoise;
  }

  #onas #foto {
    grid-column: 1/3;
    grid-row: 2/7;
    border: 2px solid black;
    margin: 5%;
  }

  #onas p {
    grid-column: 3/7;
    grid-row: 3/5;
    font-size: 20px;
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

  @media (max-width: 600px) {
    #onas #foto {
      grid-column: 1/7;
      grid-row: 3/6;
    }

    #onas p {
      grid-row: 6/8;
      grid-column: 1/7;
      font-size: 15px;
      margin: 20px;
    }

    #kontakt {
      grid-row: 8/9;
      grid-column: 1/2;
      font-size: 20px;
      margin: 20px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #kontakt:hover,
  #kontakt:active {
    color: darkolivegreen;
  }
</style>
