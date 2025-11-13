<template>
  <div id="detailClanku" :style="{ padding: '0' }">
    <div id="transboxOnas">
      <div id="detailOkno">
        <router-link :style="{ gridColumn: '3/4', justifySelf: 'flex-end' }" to="/">
          <div class="commonButton" id="domuOnas">
            Úvodní strana
          </div>
        </router-link>
        <h1 :style="{ marginTop: '0' }">O nás</h1>

        <div id="textClanku">
          <div
            v-for="(odstavec, index) in detailClanku.text"
            :key="index"
            class="odstavec"
          >
            <router-link
              v-if="odstavec.foto"
              :to="`/fotodetail/onas/1/${odstavec.foto}`"
            >
              <figure
                v-if="odstavec.foto"
                id="fotoText"
                :class="{
                  vpravo: odstavec.umisteniFoto === 'vpravo',
                  vlevo: odstavec.umisteniFoto === 'vlevo',
                  nahore: index === 0,
                }"
              >
                <img
                  :src="require(`./../assets/${odstavec.foto}`)"
                  :alt="odstavec.popisek"
                  class="fotoCesty"
                />
              </figure>
            </router-link>
            <p>{{ odstavec.textOdstavce }}</p>
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
  position: relative;
}

#transboxOnas {
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.7) 100%);
  backdrop-filter: blur(2px);
  position: relative;
  z-index: 2;
  pointer-events: none;
}

#transboxOnas > * {
  pointer-events: auto;
}

#detailOkno {
  margin: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 2% 5%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 800px;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-lg);
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

#detailClanku .commonButton {
  min-width: 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  border: none;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

#detailClanku .commonButton:hover {
  box-shadow: var(--shadow-lg);
}

#detailClanku h1 {
  grid-column: 1 / 4;
  margin-top: 40px;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 35px;
  letter-spacing: -0.5px;
}

#detailClanku h3 {
  grid-column: 1 / 4;
  color: var(--text-secondary);
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
  line-height: 1.7;
  color: var(--text-secondary);
}

#fotoText img {
  width: unset;
  height: 100%;
  object-fit: cover;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

#fotoText img:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: scale(1.02);
}

figcaption {
  font-style: italic;
  font-size: 13px;
  line-height: 1.4;
  text-decoration: none;
  color: var(--text-secondary);
  margin-top: 8px;
}

#kontakt {
  grid-column: 1/7;
  grid-row: 6/7;
  font-size: 18px;
  color: var(--text-primary);
  font-weight: 500;
}

#kontakt a {
  text-decoration: none;
  color: var(--link-color);
  font-weight: 600;
  transition: var(--transition);
  border-bottom: 2px solid transparent;
}

#kontakt a:hover,
#kontakt a:active {
  color: var(--link-hover);
  border-bottom-color: var(--link-hover);
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
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: scale(1.02);
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
