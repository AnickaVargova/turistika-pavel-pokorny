//umisteni: v Brně, na sever, na východ, na jih, na západ.
<template>
  <Sablona v-bind:params="params" />
</template>

<script>
  import Sablona from "./../components/Sablona.vue";
 import OdkazVen from "./../components/OdkazVen.vue"
  export default {
    components: {
      Sablona: Sablona,
      OdkazVen: OdkazVen,
    },

    data() {
      return {
        params: {
          nadpis: "Smírčí kříže",
          uvodniText: [
            // OdkazVen,
            "Jsou to drobné kamenné památky, mající na sobě znamení kříže. Ve středověku a raném novověku byly stavěny na místech násilné smrti. Později i jako připomínka tragické události. V Čechách mají většinou podobu kamenného kříže, na Moravě převládají kamenné desky s vytesaným křížem. Třetím druhem jsou kulaté kamenné stély, ale ta se u Brna nenašla ani jedna.",
            "Kvůli přehlednosti jsou kříže rozděleny do pěti oddílů podle světových stran, v oddílech jsou řazeny abecedně podle jména obce, v jejímž katastru nyní leží.",
            "Evidenční číslo má každý kříž přidělen od Společnosti pro výzkum kamenných křížů při muzeu v Aši. Tato společnost vede od roku 1984 centrální registr těchto památek a v roce 2019 evidovala v ČR 2500 křížů, další stovky v zahraničí a 5000 dalších drobných kamenných památek. Pořadové číslo za názvem obce používám stejně jako webové stránky euweb,  které považuji za nejserióznější. Do třiceti kilometrů od Brna je asi 90 křížů. Dalším systematickým zdrojem, byť trochu zastaralým, je kniha Kamenné kříže Čech a Moravy, 2. vydání vyšlo roku 2001.",
            "U kamenných křížů popisuji památky i v zastavěných částech obcí. Je to proto, že ve většině případů byly kříže do obcí přeneseny odjinud z volné krajiny. Jsou tu zařazeny i kříže sporné a kříže nehistorické nově vzniklé, charakterem se smírčím křížům podobající.",
            "Úmyslně tu není uvedena poloha v mapě a i popis místa, kde se nacházejí, je poněkud mlhavější. Důvod je ten, že kříže jako historické památky se ztrácejí, kradou. Důležitou zprávou pro vás je, že kříž existuje a jeho nalezení je otázkou času, intuice a štěstí.",
          
          ],

          // /skok na: http://smircikrize.euweb.cz/index.html /
          kategoriePomnicky: [
            { id: 1, nazev: "V Brně" },
            { id: 2, nazev: "Na sever" },
            { id: 3, nazev: "Na východ" },
            { id: 4, nazev: "Na jih" },
            { id: 5, nazev: "Na západ" },
          ],
          stranka: "smircikrize",
          background: "pozadiKapky.jpg",
          backgroundDescription: "Pozadí",
        },
      };
    },

    // created(){
  
    // }
  };
</script>

<style></style>
