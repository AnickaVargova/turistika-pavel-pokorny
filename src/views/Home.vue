<template>
  <div class="home-modern">
    <!-- Hero Section with Carousel -->
    <HeroSection :slides="heroSlides" />

    <!-- Quick Access Navigation -->
    <section class="nav-section">
      <div class="container">
        <div class="nav-header">
          <div class="nav-heading">
            <p class="eyebrow">{{ welcomeMessage }}</p>
            <h2>Prozkoumejte naši databázi</h2>
          </div>
          <button
            class="icon"
            type="button"
            aria-label="Zobrazit nabídku"
            @click="toggleMenu"
          >
            <i class="fa fa-bars"></i>
          </button>
        </div>

        <div :class="{ nav: true, responsive: responsive }">
          <div>
            <Loader v-if="loading.novePridane" class="homeButton" />
            <router-link v-else to="/novepridane">
              Naposled přidané
              <span class="count">&nbsp;{{ counts.novePridane }}</span>
            </router-link>
          </div>
          <div>
            <a :href="mapaUrl" target="_self" id="mapabutton">Mapa</a>
          </div>
          <div>
            <Loader class="homeButton" v-if="loading.pomnicky" />
            <router-link v-else to="/pomnicky">
              Pomníčky <span class="count">&nbsp;{{ counts.pomnicky }}</span>
            </router-link>
          </div>
          <div>
            <Loader class="homeButton" v-if="loading.krize" />
            <router-link v-else to="/krize">
              Smírčí kříže
              <span class="count">&nbsp;{{ counts.krize }}</span>
            </router-link>
          </div>
          <div>
            <Loader class="homeButton" v-if="loading.studanky" />
            <router-link v-else to="/studanky">
              Studánky <span class="count">&nbsp;{{ counts.studanky }}</span>
            </router-link>
          </div>
          <div>
            <Loader class="homeButton" v-if="loading.cesty" />
            <router-link v-else to="/cesty">
              Cesty <span class="count">&nbsp;{{ counts.cesty }}</span>
            </router-link>
          </div>
          <div>
            <Loader class="homeButton" v-if="loading.vypraveni" />
            <router-link v-else to="/vypraveni">
              Vyprávění
              <span class="count">&nbsp;{{ counts.vypraveni }}</span>
            </router-link>
          </div>
          <div>
            <router-link to="/onas">O nás</router-link>
          </div>
          <div>
            <router-link to="/odkazy">Sympatické weby</router-link>
          </div>
          <div>
            <a href="https://turistapavel.rajce.idnes.cz/" target="_blank">
              Moje rajče
            </a>
          </div>
        </div>

        <div class="nav-counter">
          <a
            href="https://www.toplist.cz/stat/1802686/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.toplist.cz/count.asp?id=1802686&amp;logo=mc&amp;http=https%3A//www.google.com/&amp;wi=1440&amp;he=900&amp;cd=24&amp;t=Turistika Pavel Pokorný"
              style="border: 0; width: 88px; height: 60px"
              alt="Toplist"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <CategoriesSection />

    <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <h2 class="section-title">O projektu</h2>
        <div class="about-content">
          <p>
            Naše webové stránky se zabývají regionální vlastivědou v Brně a
            okolí, turistikou a cestováním po republice i po Evropě. Popisují
            pomníčky, smírčí kříže, studánky a další objekty turistického zájmu
            v okruhu zhruba třiceti kilometrů od Brna.
          </p>
          <p>
            V osmdesátých letech jsme začali hledat pomníčky kolem Brna a dosud
            nepřestali. Počet těchto objektů přesahuje odhadem tisícovku a mění
            se, některé přibývají, jiné zanikají. Doufáme, že tyto stránky se
            mohou stát vaší inspirací k výletům a vyjížďkám do spanilého okolí
            brněnského.
          </p>
          <router-link to="/onas" class="read-more-button">
            Více o nás <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="modern-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Turistika Pavel Pokorný</h3>
            <p>Objevujte historické památky a přírodní krásy v okolí Brna</p>
          </div>
          <div class="footer-section">
            <h4>Rychlé odkazy</h4>
            <div class="footer-links">
              <router-link to="/pomnicky">Pomníčky</router-link>
              <router-link to="/krize">Smírčí kříže</router-link>
              <router-link to="/studanky">Studánky</router-link>
              <router-link to="/vypraveni">Vyprávění</router-link>
              <router-link to="/cesty">Cesty</router-link>
              <router-link to="/onas">O nás</router-link>
            </div>
          </div>
          <div class="footer-section">
            <h4>Další odkazy</h4>
            <div class="footer-links">
              <router-link to="/odkazy">Sympatické weby</router-link>
              <a :href="mapaUrl" target="_self">Mapa</a>
              <a
                href="https://turistapavel.rajce.idnes.cz/"
                target="_blank"
                rel="noopener"
              >
                Moje rajče
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>
            <small>
              Stránky vytvořila Anna Vargová
              <a href="mailto:anna.vargova@seznam.cz">anna.vargova@seznam.cz</a>
            </small>
          </p>
          <div class="footer-counter">
            <a
              href="https://www.toplist.cz/stat/1802686/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://www.toplist.cz/count.asp?id=1802686&amp;logo=mc&amp;http=https%3A//www.google.com/&amp;wi=1440&amp;he=900&amp;cd=24&amp;t=Turistika Pavel Pokorný"
                style="border: 0; width: 88px; height: 60px"
                alt="Toplist"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Loader from "../components/Loader.vue";
import HeroSection from "../components/HeroSection.vue";
import CategoriesSection from "../components/CategoriesSection.vue";
import { heroSlides } from "../data/heroSlides";
import { testUrl, mapaUrl } from "../utils/url";
import { useCategoryStats } from "../composables/useCategoryStats";

const { counts, loading, fetchAllCounts } = useCategoryStats();

const responsive = ref(false);

const isTest = computed(() => location.origin === testUrl);

const welcomeMessage = computed(() => {
  return isTest.value
    ? "Vítejte na testovacím prostředí"
    : "Vítejte na našich webových stránkách";
});

const toggleMenu = () => {
  responsive.value = !responsive.value;
};

onMounted(async () => {
  await fetchAllCounts();
});
</script>

<style scoped>
.home-modern {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

/* About Section */
.about-section {
  padding: 100px 20px;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Quick Navigation */
.nav-section {
  padding: 80px 20px 40px;
  background: #f8fafc;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.nav-heading h2 {
  font-size: 36px;
  margin: 10px 0 0;
  color: #0f172a;
  letter-spacing: -0.5px;
}

.eyebrow {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #94a3b8;
  margin: 0;
}

.icon {
  border: 1px solid rgba(148, 163, 184, 0.5);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon:hover {
  color: #4c6793;
  border-color: #4c6793;
}

.nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.nav > div {
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nav > div:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);
}

.nav a,
.nav .homeButton {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 0 10px;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #0f172a;
  font-family: "Raleway", sans-serif;
}

.nav .homeButton {
  justify-content: center;
}

#mapabutton {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: white;
  border-radius: 999px;
  padding: 0 20px;
}

#mapabutton:hover {
  background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
  box-shadow: 0 12px 24px rgba(6, 182, 212, 0.35);
}

.count {
  color: #475569;
  font-size: 14px;
  font-weight: 500;
}

.nav-counter {
  margin-top: 30px;
  text-align: right;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.nav-counter:hover {
  opacity: 1;
}

@media (min-width: 901px) {
  .icon {
    display: none;
  }
}

@media (max-width: 900px) {
  .nav {
    display: none;
  }

  .nav.responsive {
    display: grid;
  }
}

.section-title {
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: #1e293b;
  font-family: "Raleway", sans-serif;
  letter-spacing: -1px;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-content p {
  font-size: 18px;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 20px;
}

.read-more-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #4c6793 0%, #6b8cc4 100%);
  border: none;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 20px;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.read-more-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(76, 103, 147, 0.3);
}

.read-more-button i {
  transition: transform 0.3s ease;
}

.read-more-button:hover i {
  transform: translateX(5px);
}

/* Modern Footer */
.modern-footer {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 60px 20px 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
  font-family: "Raleway", sans-serif;
}

.footer-section h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  font-family: "Raleway", sans-serif;
  color: #94a3b8;
}

.footer-section p {
  font-size: 14px;
  line-height: 1.6;
  color: #cbd5e1;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-links a:hover {
  color: white;
  transform: translateX(5px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-bottom p {
  margin: 0;
  font-size: 14px;
  color: #cbd5e1;
}

.footer-bottom a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
  margin-left: 5px;
}

.footer-bottom a:hover {
  color: white;
}

.footer-counter {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.footer-counter:hover {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 900px) {
  .about-section {
    padding: 60px 20px;
  }

  .section-title {
    font-size: 36px;
    margin-bottom: 40px;
  }

  .about-content p {
    font-size: 16px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .about-section {
    padding: 40px 15px;
  }

  .section-title {
    font-size: 28px;
  }

  .about-content p {
    font-size: 15px;
  }

  .read-more-button {
    padding: 12px 28px;
    font-size: 14px;
  }

  .modern-footer {
    padding: 40px 15px 15px;
  }
}
</style>

