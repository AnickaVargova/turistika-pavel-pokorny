<template>
  <div id="detailClanku">
    <div id="detailOkno">
      <!-- <router-link v-bind:to="`/${detailClanku.kategorie}`">
        <div class="pomnicekKategorie" id="zpetNaClanky">
          Zpět na články
        </div>
      </router-link> -->
      <h1>O nás</h1>

      <div id="textClanku">
        <div
          v-for="(odstavec, index) in detailClanku.text"
          v-bind:key="index"
          class="odstavec"
        >
          <router-link
            v-if="odstavec.foto"
            v-bind:to="
              `/fotodetail/onas/${odstavec.foto}`
            "
          >
          <figure
            v-if="odstavec.foto"
            id="fotoText"
            v-bind:class="{
              vpravo: odstavec.umisteniFoto === 'vpravo',
              vlevo: odstavec.umisteniFoto === 'vlevo',
              nahore: index === 0,
            }"
          >
            <img
              v-bind:src="require(`./../assets/${odstavec.foto}`)"
              alt="My v přírodě"
            />
            <!-- <figcaption>{{ odstavec.popisek }}</figcaption> -->
          </figure>
          </router-link>
          <p>
            {{ odstavec.textOdstavce }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detailClanku: {
          text: [
            {
              textOdstavce:
                "Jsme dva turisté, tuláci, cestovatelé silně důchodového věku (Pavel 1948, Lída 1949). Oba odmalička procházíme různými obdobími turistického života, pravda zpočátku každý zvlášť, od roku 1972 společně. V mládí jsme jezdili na hory i na vodu, lezli po skalách i do jeskyní. Kromě dětí, domů, duchovního života, vnoučat, dobrovolné skromnosti, chalupy, zahrad a dalších nemovitostí jsme se v životě zabývali turistikou v nejrůznějších podobách.",
              foto: "onas2.jpg",
              umisteniFoto: "vlevo",
            },
            {
              textOdstavce:
                "Od studentských let se družíme se skupinou přátel, která si kdysi dala jméno Brněnská chasa. S jejími pohrobky se scházíme a jezdíme na hory dodnes.",
            },
            {
              textOdstavce:
                "Společnou celoživotní vášní je pro nás dva táboření, bivakování a pobyt ve volné přírodě. Začali jsme s tím před padesáti lety, kdy zákazů táboření bylo minimálně a ledacos se tolerovalo. S léty je to u nás a na Slovensku stále těžší. Přibývá zákazů, pravidel a vyhrazených míst na táboření, kterým se vyhýbáme. Naštěstí jsou ještě po Evropě země, kde se volně tábořit dá a nebo je tolerováno, protože nikoho nenapadlo to zakazovat (Balkán, Skandinávie). Programově vyhledáváme skrytá, málo známá a nenavštěvovaná místa, ať je to kolem Brna, po republice nebo na Slovensku.",
                foto: "onas1.jpg",
                umisteniFoto: "vpravo",
            },
            {
              textOdstavce:
                "Na stará kolena jsme rozšířili okruh našich zájmů. Pavel se zabývá regionální vlastivědou Brna a okolí a z jeho pera pocházejí všechna vyprávění na tomto webu. Lída se baví lingvistikou a z těchto vyprávění odstraňuje gramatické a slohové nedostatky. Oba jsme pak propadli botanice na amatérské úrovni a kytičkářství, tedy vyhledávání krásných a vzácných květin v přírodě.",
            },
          ],
        },
      };
    },
    
  };
</script>

<style>
  #detailClanku {
    background-color: beige;
    padding: 2%;
  }

  #detailOkno {
    margin: auto;
    /* margin-top: 20px; */
    border: 2px solid grey;
    border-radius: 10px;
    padding: 2% 5%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* gap: 20px; */
    max-width: 800px;
    background-color: white;
  }

  @media (max-width: 600px) {
    #detailOkno {
      border: none;
    }

    #detailClanku {
      padding: 0;
    }

    #detailOkno p {
      font-size: 15px;
    }
  }

  #zpetNaClanky {
    width: 50%;
    min-width: 80px;
    padding: 10px;
    height: auto;
  }

  #detailClanku h1 {
    grid-column: 1 / 4;
    margin-top: 50px;
  }

  #detailClanku h3 {
    grid-column: 1 / 4;
  }

  #fotoText {
    height: 200px;
    max-width: 40%;
    min-width: 150px;
  }

  .vpravo {
    float: right;
    margin-right: 0;
    margin-bottom: 30px;
    margin-top: 16px;
    margin-left: 30px;
  }

  .vlevo {
    float: left;
    margin-right: 30px;
    margin-bottom: 30px;
    margin-top: 16px;
    margin-left: 0;
  }

  .nahore {
    margin-top: 0;
  }

  #textClanku {
    grid-column: 1 / span 3;
    margin-bottom: 20px;
    text-align: justify;
    line-height: 1.5;
  }

  #fotoText img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  figcaption {
    font-style: italic;
    font-size: 15px;
    text-decoration: none;
    color: black;
  }

  a {
    text-decoration: none;
  }

  .obrazek {
    flex-basis: 33.33%;
  }

  .obrazek figure {
    width: 90%;
    height: 80%;
    object-fit: cover;
    margin-left: 0;
  }

  #detailClanku img {
    border: 2px solid grey;
    border-radius: 5px;
  }

  #detailClanku img:hover,
  #detailClanku img:active {
    border: 2px solid black;
  }

  #galerieClanek {
    grid-column: 1 / span3;
    display: flex;
    justify-content: flex-start;
  }

  @media (max-width: 600px) {
    #galerieClanek {
      flex-direction: column;
    }
  }
</style>
