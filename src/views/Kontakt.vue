<template>
  <div id="malyKontakt">
    <div id="mail">
      <div id="jmeno">Pavel Pokorný</div>
      <div id="krizekKontejner" v-on:click="zmiz">
        <img src="./../assets/krizek.png" />
      </div>
    </div>
    <span>pokorny.pavel1@centrum.cz</span>
  </div>
</template>

<script>
  export default {
    methods: {
      zmiz() {
        this.$emit("zmiz");
      },
    },
  };
</script>

<style>
  #krizekKontejner {
    width: 10px;
    padding: 10px;
  }

  
  #mail {
   
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  #jmeno {
      padding: 10px 0;
  }
</style>
