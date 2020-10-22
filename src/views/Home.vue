<template>
  <div class="home">
    <div id="pozadi">
      <img src="./../assets/foto01.jpg" alt="hory" />
    </div>

    <div id="transbox"></div>
    <div v-bind:class="{responsive:responsive}" id="uvodniText">
      <h1>Tady bude krátký text o tomto webu.</h1>
      <p >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
        vitae consequuntur nisi culpa dolorum voluptate perspiciatis voluptas,
        modi qui molestias dignissimos deserunt temporibus perferendis autem,
        mollitia ipsum. Voluptatibus, placeat officiis.
      </p>
    </div>

    <div v-bind:class="{nav:true, responsive:responsive}">
      <router-link
        v-bind:class="{
          oznaceny: nadpis === 'Pomníčky',
          neoznaceny: nadpis !== 'Pomníčky',
        }"
        to="/pomnicky"
        >Pomníčky
      </router-link>

      <router-link
        v-bind:class="{
          oznaceny: nadpis === 'Studánky',
          neoznaceny: nadpis !== 'Studánky',
        }"
        to="/studanky"
        >Studánky
      </router-link>

      <router-link
        v-bind:class="{
          oznaceny: nadpis === 'Smírčí kříže',
          neoznaceny: nadpis !== 'Smírčí kříže',
        }"
        to="/smircikrize"
        >Smírčí kříže
      </router-link>

      <router-link
        v-bind:class="{
          oznaceny: nadpis === 'Cesty',
          neoznaceny: nadpis !== 'Cesty',
        }"
        to="/cesty/2020"
        >Cesty
      </router-link>

      <router-link
        v-bind:class="{
          oznaceny: nadpis === 'Vyprávění',
          neoznaceny: nadpis !== 'Vyprávění',
        }"
        to="/vypraveni/2020"
        >Vyprávění</router-link
      >

      <router-link
        v-bind:class="{
          oznaceny: nadpis === 'O nás',
          neoznaceny: nadpis !== 'O nás',
        }"
        to="/onas"
        >O nás</router-link
      >

      <router-link
        v-bind:class="{
          oznaceny: nadpis === 'Odkazy',
          neoznaceny: nadpis !== 'Odkazy',
        }"
        to="/odkazy"
        >Sympatické weby</router-link
      >

      <!-- <router-link
        v-bind:class="
          oznaceny: nadpis === 'Kontakt',
          neoznaceny: nadpis !== 'Kontakt',
        }"
        to="/"
        >-->
      <a
        href="mailto:someone@example.com?Subject=Pozdrav"
        v-bind:class="{
          oznaceny: nadpis === 'Kontakt',
          neoznaceny: nadpis !== 'Kontakt',
        }"
      >
        Kontakt</a
      >
      <!-- >Kontakt</router-link
      > -->

      <a
        href="https://turistapavel.rajce.idnes.cz/"
        target="_blank"
        v-bind:class="{
          oznaceny: nadpis === 'Kontakt',
          neoznaceny: nadpis !== 'Kontakt',
        }"
      >
        Moje rajče</a
      >
      
    </div>
    <a href="javascript:void(0);" class="icon" v-on:click="toggleMenu">
        <i class="fa fa-bars"></i>
      </a>
  </div>
</template>

<script>
  //todo: vyresit mapy
  //sjednotit navigace, hover, active, nabidnuty vyber
  //vyrobit dostatek mock clanku
  //vyresit podkategorie tak, aby slo snadno pridavat
  //rozdelit databazi na typ pomnicky a typ clanky
  export default {
    data() {
      return {
        nadpis: "",
        responsive: false,
      };
    },

    methods: {
      toggleMenu(){
         this.responsive=!this.responsive;
      }
    }
  };
</script>

<style>


.icon {
  display: none;
  grid-column: 5/6;
  grid-row: 1/2;
  font-size: 50px;
  justify-content: center;
  align-content: center;
  color: darkslategrey;
  margin-top: 20px;
}

@media (max-width: 600px) {
   .icon {
       display: block;
  }
}
  .home {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: grid;
    grid-template-columns: repeat(6, 20%);
    grid-template-rows: repeat(40, 60px);
    /* gap: 10px; */
    margin: 0;
    padding: 0;
  }

  #uvodniText {
    /* display: flex; */
    justify-content: center;
    align-items: center;
    grid-column: 2 / 6;
    grid-row: 2 / 6;
    margin: 5%;
  }

  @media (max-width: 600px) {
   #uvodniText {
       grid-column: 1/6;
       padding: 5%;
  }
}

  #pozadi {
    grid-row: 1/15;
    grid-column: 1/7;
    width: 100vw;
    height: 300vh;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
  }

  #pozadi img {
    grid-column: 1 / 7;
    grid-row: 1 / 14;
    height: 300vh;
    width: 100vw;
    object-fit: cover;
  }

  #transbox {
    grid-column: 1 / 7;
    grid-row: 1 / 14;
    width: 100vw;
    height: 300vh;
    background-color: rgba(160, 193, 221, 0.5);
    margin-right: 0;
  }

  h1 {
    text-align: center;
    color: #2c3e50;
  }

  .nav {
    grid-column: 1/2;
    grid-row: 1/11;
    padding: 0;
    display: grid;
    gap: 10px;
    grid-template-rows: repeat(10, 1fr);
    margin: 20px;
  }

  .nav a {
    opacity: 1;
    font-weight: bold;
    text-decoration: none;
    width: 100%;
    height: 100%;
    border: 2px solid #2c3e50;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    padding-left: 10%;
    align-items: center;
    text-transform: uppercase;
    box-shadow: 5px 2px 2px #395250;
  }

  @media (max-width: 600px) {
  .nav a {display: none;}
  
}

.nav.responsive a {
  display:flex;
}

#uvodniText.responsive {
  display:none;
}

  .nav a:hover,
  .nav a:active {
    color: #13131d;
    background-color: #9aacab;
  }

  #okno {
    grid-column: 1/7;
    grid-row: 1/43;
    width: 100%;
  }

  #pomnickyFiltry {
    grid-column: 5 / span 1;
    grid-row: 2/4;
    background-color: #9aacab;
    border: 2px solid black;
    padding: 10px;
    border-radius: 3px;
  }

  #pomnickyFiltry li:hover {
    background-color: #30524f;
  }

  .oznaceny {
    background-color: #9aacab;
    color: #13131d;
  }

  .neoznaceny {
    background-color: #6bc5aa;
    color: #13131d;
  }

  


</style>

<!-- <ul id="archiv">
      
      <li  v-for="rok in roky" v-bind:key="rok.id"  v-on:click="vypisRok(rok)">{{rok}}</li> -->

<!-- v-bind:class='{zakliknuty:rokFiltr||vybranyRok===rok, nezakliknuty: vybranyRok !==rok}' -->

<!-- </ul> -->
<!-- <div v-if="rokFiltr"  class="clanky">
      
      <div class = "clanek" v-for="(clanek,index) in zobrazeneClanky" v-bind:key="index" >
       <router-link v-on:click="zpetNaClanek" v-bind:to="`detail/${clanek.id}`">
        <h2>{{clanek.nadpis}}</h2>
        <h3>{{clanek.datum}}</h3>
        <div class="clanekFoto"> <img v-bind:src="require(`./../assets/${clanek.fotkaUvod.fotka}`)">
       </div>
        <p>{{clanek.kratkyText}}</p>
        </router-link>
        </div>
        
         
    </div> 

    <div v-else class="clanky">
      
      <div class = "clanek" v-for="(clanek,index) in vybraneClanky" v-bind:key="index" v-on:click="zpetNaClanek">
        <router-link v-on:click="zpetNaClanek" v-bind:to="`detail/${clanek.id}`">
        <h2>{{clanek.nadpis}}</h2>
        <h3>{{clanek.datum}}</h3>
        <div class="clanekFoto"><img v-bind:src="require(`./../assets/${clanek.fotkaUvod.fotka}`)"></div>
        <p>{{clanek.kratkyText}}</p>
        </router-link>
              </div>
        
    </div>  -->
<!-- </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    props: ["titul", "vybraneClanky", "rokFiltr", "clanky"],
    data() {
      return {
        vybranyRok: undefined,
        zobrazeneClanky: [],
        roky: [],
      };
    },

    methods: {
      vypisRok(rok) {
        this.vybranyRok = rok;
        this.$emit("rokFiltr");
        this.zobrazeneClanky = this.vybraneClanky
          .filter((clanek) => clanek.rok === rok)
          .sort((a, b) => b.ms - a.ms);
      },

      poleRoku() {
        for (let clanek of this.clanky) {
          if (!this.roky.includes(clanek.rok)) {
            this.roky.push(clanek.rok);
          }
        }
        this.roky = this.roky.sort((a, b) => b - a);
        console.log(this.roky);
      },

      zrusRok() {
        console.log("zruseno");
      },

      zpetNaClanek() {
        this.$emit("vybrano");
        console.log("clanek");
      },
    },

    created() {
      this.zobrazeneClanky = this.vybraneClanky;
      this.rokFiltr = false;
      this.poleRoku();
    },
  };
</script>
<style scoped>
  .home {
    /* width: 80%; */
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
    /* gap: 10px; */
    margin: 0;
    padding: 0;
  }

  

  #uvodniText h1 {
    font-size: 40px;
    text-align: center;
  }

  #uvodniText p {
    font-size: 20px;
    text-align: left;
    margin-left: 20px;
  }

  

  #archiv {
    grid-column: 1/2;
    grid-row: 1/5;
    padding: 0;
    margin: 0;
    list-style: none;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: 1fr;
    align-items: stretch;
  }

  #archiv li {
    border: 2px solid black;
    border-right: none;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
  }

  #archiv li:hover,
  #archiv li:active {
    background-color: #9a9aac;
  }

  .clanky {
    grid-column: 1 / span 6;
    grid-row: 5 / span 40;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
    margin-top: 5px;
  }

  .clanky a {
    text-decoration: none;
    color: black;
  }

  .clanekFoto {
    grid-column: 5 / span 2;
    grid-row: span 4;
  }
  .clanek {
    margin-top: 10px;
    grid-column: 1 / span 6;
    grid-row: span 6;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
  }

  .clanek a {
    grid-column: 1 / span 6;
    grid-row: span 6;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
  }

  .clanek:hover,
  .clanek:active {
    background-color: lightgray;
  }

  .clanek h2 {
    grid-row: 1/2;
    grid-column: span 6;
    text-decoration: underline;
    color: teal;
    font-weight: bold;
    font-size: 30px;
  }

  .clanek h3 {
    font-size: 20px;
    font-weight: normal;
  }

  .clanek p {
    grid-column: 1 / span 4;
    grid-row: span 8;
  }

  .clanekFoto > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .zakliknuty {
    background-color: #9a9aac;
  }

  .nezakliknuty {
    background-color: lightgrey;
  }
</style> -->
