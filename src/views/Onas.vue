<template>
  <div id="detailClanku" v-bind:style="{padding:'0'}">
    <div id="transboxOnas">
      <div id="detailOkno">
        <router-link to="/">
          <div class="pomnicekKategorie" id="domuOnas">
            Domů
          </div>
        </router-link>
        <h1 v-bind:style="{marginTop:'0'}">O nás</h1>

        <div id="textClanku">
          <div
            v-for="(odstavec, index) in detailClanku.text"
            v-bind:key="index"
            class="odstavec"
          >
            <router-link
              v-if="odstavec.foto"
              v-bind:to="`/fotodetail/onas/${odstavec.foto}`"
              v-bind:popisek="odstavec.popisek"
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
                  v-bind:alt="odstavec.popisek"
                />
                <figcaption>{{ odstavec.popisek }}</figcaption>
              </figure>
            </router-link>
            <p>
              {{ odstavec.textOdstavce }}
            </p>
          </div>
        </div>
        <p id="kontakt">Kontakt: pokorny.pavel1@centrum.cz</p>
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
                "Jsme dva turisté, tuláci, cestovatelé silně důchodového věku (Pavel 1948, Lída 1949). Oba odmalička procházíme různými obdobími turistického života, pravda zpočátku každý zvlášť, od roku 1972 společně. V\xa0mládí jsme jezdili na hory i na vodu, lezli po skalách i do jeskyní. Teď už jen běžky nasazujem, bicykly sedláme a pohorky obouváme. Kromě dětí, domů, duchovního života, vnoučat, dobrovolné skromnosti, chalupy, zahrad a dalších nemovitostí jsme se v\xa0životě zabývali turistikou v\xa0nejrůznějších podobách.",
              foto: "onas2.jpg",
              popisek: "Polsko, Czarna Hancza  (červenec 2018) ",
              umisteniFoto: "vlevo",
            },
            {
              textOdstavce:
                "Od studentských let se družíme se skupinou přátel, která si kdysi dala jméno Brněnská chasa. S\xa0jejími pohrobky se scházíme a jezdíme na hory dodnes.",
            },
            {
              textOdstavce:
                "Společnou celoživotní vášní je pro nás dva táboření, bivakování a pobyt ve volné přírodě. Začali jsme s\xa0tím před padesáti lety, kdy zákazů táboření bylo minimálně a ledacos se tolerovalo. S\xa0léty je to u nás a na Slovensku stále těžší. Přibývá zákazů, pravidel a vyhrazených míst na táboření, kterým se vyhýbáme. Naštěstí jsou ještě po Evropě země, kde se volně tábořit dá a nebo je tolerováno, protože nikoho nenapadlo to zakazovat (Balkán, Skandinávie). Programově vyhledáváme skrytá, málo známá a nenavštěvovaná místa, ať je to kolem Brna, po republice nebo na Slovensku.",
              foto: "onas1.jpg",
              popisek: "Rumunsko, Trascau  (září 2016)",
              umisteniFoto: "vpravo",
            },
            {
              textOdstavce:
                "Na stará kolena jsme rozšířili okruh našich zájmů. Pavel se zabývá regionální vlastivědou Brna a okolí a z\xa0jeho pera pocházejí všechna vyprávění na tomto webu. Lída se baví lingvistikou a z\xa0těchto vyprávění odstraňuje gramatické a slohové nedostatky. Oba jsme pak propadli botanice na amatérské úrovni a kytičkářství, tedy vyhledávání krásných a vzácných květin v\xa0přírodě.",
            },
          ],
        },
      };
    },
  };
</script>

<style>


  #detailClanku {
    background-image: url("./../assets/bileTahy.jpg");
    padding: 0;
  }

  #transboxOnas {
    width: 100%;
    background-color: rgba(234, 235, 224, 0.7);
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

  #detailClanku .pomnicekKategorie {
    min-width: 0;
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
    width: min-content;
    /* max-width: 40%;
    min-width: 150px; */
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
    width: unset;
    height: 100%;
    object-fit:cover;
    
  }

  figcaption {
    font-style: italic;
    font-size: 12px;
    line-height: 1.2;
    text-decoration: none;
    color: black;
  }

 

   #kontakt {
    grid-column: 1/7;
    grid-row: 6/7;
    /* margin-left: 5%;
    margin-right: 5%; */
    font-size: 20px;
    color: black
    /* text-decoration: underline; */
  }

    #kontakt a {
    text-decoration: underline;
     color: rgb(23, 59, 37);
  }

  #kontakt a:hover,
  #kontakt a:active {
    color: darkolivegreen;
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
