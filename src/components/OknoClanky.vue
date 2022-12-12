<template>
  <div>
    <Loader v-if="this.loading" />

    <div id="oknoPomnicky" v-if="this.zalozkyButton && !this.loading">
      <div
        class="kontejnerClanek"
        v-for="(clanek, index) in mojeClanky"
        v-bind:key="index"
      >
        <Zalozka v-bind:mujClanek="clanek" v-bind:stranka="stranka" />
      </div>
    </div>
  </div>
</template>

<script>
import Zalozka from "./Zalozka.vue";
import Loader from "./Loader.vue";
import { removeDuplicates} from "../utils/removeDuplicates";

export default {
  props: ["stranka", "zalozkyButton"],
  components: { Zalozka, Loader },
  data() {
    return {
      mojeClanky: [],
      loading: true,
    };
  },
  created() {
    if (this.$route.name === "NovePridane") {
      fetch(`http://localhost:8080/novePridane`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => (this.mojeClanky = removeDuplicates(data)))
        .then(() => {
          this.loading = false;
        });
    } else if (
      this.$route.name === "PomnickyKategorie" ||
      this.$route.name === "SmirciKrizeKategorie"
    ) {
      fetch(
        `http://localhost:8080/${this.stranka}/${this.$route.params.kategorie}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => (this.mojeClanky = data))
        .then(() => {
          this.loading = false;
        });
    }
    //REMOVE
    else {
     
      fetch(`http://localhost:8080/${this.stranka}/1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => (this.mojeClanky = data))
        .then(() => {
          this.loading = false;
        });
    }
  },
};
</script>

<style>
.clanek {
  display: grid;
  grid-template-columns: 75% 25%;
  border: 2px solid grey;
  margin: auto;
  margin-bottom: 5px;
  border-radius: 10px;
  padding: 10px;
  max-height: 200px;
  max-width: 70vw;
  color: rgb(87, 81, 81);
}

.clanek h2 {
  grid-row: 1/2;
  grid-column: 1/2;
  margin: 15px;
  margin-bottom: 0;
}

.clanek h4 {
  grid-row: 2/3;
  grid-column: 1/2;
  margin-left: 15px;
  margin-top: 5px;
  color: rgb(63, 58, 139);
}

.clanek h3 {
  grid-row: 3/4;
  grid-column: 1/2;
  justify-items: center;
  align-items: center;
  margin: 5px;
  margin-left: 15px;
}

.clanekFoto {
  grid-row: 1/4;
  grid-column: 2/3;
  width: 100%;
  height: 148px;
  border: 2px solid grey;
  border-radius: 5px;
}

.clanekFoto img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

@media (max-width: 600px) {
  .kontejnerClanek {
    border-bottom: 2px solid grey;
  }

  .kontejnerClanek:last-child {
    border-bottom: none;
  }

  .clanek {
    border: none;
    border-radius: 0;
    grid-template-rows: auto;
    grid-template-columns: 3fr 1fr;
    max-width: unset;
    max-height: unset;
    width: 90%;
  }
}

.clanek:hover {
  border: 2px solid black;
  color: black;
  background-color: whitesmoke;
}
</style>
