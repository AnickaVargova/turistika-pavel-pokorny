<template>
    <div class = 'zalozkaSmall' v-on:click="goToPar" v-if="zalozka.text">
        {{zalozka.text}}
    </div>
</template>

<script>
export default {
  props: ["zalozka"],
 
  methods: {
    goToPar(){
        sessionStorage.setItem("paragraphId", this.zalozka.paragraphId);
    }
  }
};
</script>

<style>
.zalozkaSmall {
    border: 1px solid grey;
    padding: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: #cae0f0;
    color: #2c3e50;
    display:flex;
    align-items: center;
}

.zalozkaSmall:hover {
  border: 1px solid black;
  color: black;
  background-color: #b7d8f0;
}

</style>