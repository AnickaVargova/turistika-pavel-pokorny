<template>
  <Sablona v-bind:params="params" />
</template>

<script>
import Sablona from "./../components/Sablona.vue";
export default {
  components: {
    Sablona: Sablona,
  },

  data() {
    return {
      params: {
        nadpis: "Smírčí kříže",
        uvodniText: [
          {
            textOdstavce:
              "Jsou to drobné kamenné památky, mající na sobě znamení kříže. Ve středověku a raném novověku byly stavěny na místech násilné smrti. Později i jako připomínka tragické události. V\xa0Čechách mají většinou podobu kamenného kříže, na Moravě převládají kamenné desky  s\xa0vytesaným křížem. Třetím druhem jsou kulaté kamenné stély, ale ta se u Brna nenašla ani jedna.",
          },
          {
            textOdstavce:
              "Kvůli přehlednosti jsou kříže rozděleny do pěti oddílů podle světových stran,  v\xa0oddílech jsou řazeny abecedně podle jména obce,  v\xa0jejímž katastru nyní leží.",
          },
          {
            textOdstavce:
              "Evidenční číslo má každý kříž přidělen od Společnosti pro výzkum kamenných křížů při muzeu  v\xa0Aši. Tato společnost vede od roku 1984 centrální registr těchto památek a  v\xa0roce 2019 evidovala  v\xa0ČR 2500 křížů, další stovky  v\xa0zahraničí a 5000 dalších drobných kamenných památek. Pořadové číslo za názvem obce používám stejně jako webové stránky  <span><a href='http://smircikrize.euweb.cz/index.html' target='_blank' class='vnitrniOdkaz'>euweb</a></span>,  které považuji za nejserióznější. Do třiceti kilometrů od Brna je asi 90 křížů. Dalším systematickým zdrojem, byť trochu zastaralým, je kniha Kamenné kříže Čech a Moravy, 2. vydání vyšlo roku 2001.",
          },

          {
            textOdstavce:
              "Úmyslně tu není uvedena poloha  v\xa0mapě a i popis místa, kde se nacházejí, je poněkud mlhavější. Důvod je ten, že kříže jako historické památky se ztrácejí, kradou. Důležitou zprávou pro vás je, že kříž existuje a jeho nalezení je otázkou času, intuice a štěstí. Důkladnější text o křížích lze najít ve ",
            vnitrniOdkazy: [
              {
                vnitrniOdkaz: 116,
                odkazPodkategorie: 1,
                odkazKategorie: "vypraveni",
                odkazKde: "odstavec",
                textOdkazu: "vyprávění",
                zaOdkazem: ".",
              },
            ],
          },
        ],

        kategoriePomnicky: [],
        stranka: "krize",
        background: "pozadiKapky.jpg",
        transbox: "rgba(211, 214, 214, 0.8)",
        backgroundDescription: "Pozadí",
      },
    };
  },

  created() {
    fetch(`http://localhost:8080/krize/categoryCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => (this.params.kategoriePomnicky = data));
  },
};
</script>

<style></style>
