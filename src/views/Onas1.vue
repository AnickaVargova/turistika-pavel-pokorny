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

    <div id="foto"><img src="@/assets/hikers.jpg" alt="My na cestách" /></div>
    <div id="onasText">
      <p>
        Jsme dva turisté, tuláci, cestovatelé silně důchodového věku (Pavel
        1948, Lída 1949). Oba odmalička procházíme různými obdobími turistického
        života, pravda zpočátku každý zvlášť, od roku 1972 společně. V mládí
        jsme jezdili na hory i na vodu, lezli po skalách i do jeskyní. Kromě
        dětí, domů, duchovního života, vnoučat, dobrovolné skromnosti, chalupy,
        zahrad a dalších nemovitostí jsme se v životě zabývali turistikou v
        nejrůznějších podobách.
      </p>
      <p>
        Od studentských let se družíme se skupinou přátel, která si kdysi dala
        jméno Brněnská chasa. S jejími pohrobky se scházíme a jezdíme na hory
        dodnes.
      </p>
      <p>
        Společnou celoživotní vášní je pro nás dva táboření, bivakování a pobyt
        ve volné přírodě. Začali jsme s tím před padesáti lety, kdy zákazů
        táboření bylo minimálně a ledacos se tolerovalo. S léty je to u nás a na
        Slovensku stále těžší. Přibývá zákazů, pravidel a vyhrazených míst na
        táboření, kterým se vyhýbáme. Naštěstí jsou ještě po Evropě země, kde se
        volně tábořit dá a nebo je tolerováno, protože nikoho nenapadlo to
        zakazovat (Balkán, Skandinávie). Programově vyhledáváme skrytá, málo
        známá a nenavštěvovaná místa, ať je to kolem Brna, po republice nebo na
        Slovensku.
      </p>
      <p>
        Na stará kolena jsme rozšířili okruh našich zájmů. Pavel se zabývá
        regionální vlastivědou Brna a okolí a z jeho pera pocházejí všechna
        vyprávění na tomto webu. Lída se baví lingvistikou a z těchto vyprávění
        odstraňuje gramatické a slohové nedostatky. Oba jsme pak propadli
        botanice na amatérské úrovni a kytičkářství, tedy vyhledávání krásných a
        vzácných květin v přírodě.
      </p>
    </div>
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

  #onas .pomnicekKategorie {
    min-width: 0;
  }

  #domuOnas:hover {
    color: #13131d;
    background-color: #9aacab;
  }

  #onas #foto {
    grid-column: 1/3;
    grid-row: 2/7;
    border: 2px solid black;
    margin: 5%;
  }

  #onasText {
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
