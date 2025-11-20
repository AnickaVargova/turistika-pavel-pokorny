<template>
  <div class="home-modern">
    <!-- Hero Section with Carousel -->
    <HeroSection :slides="heroSlides" />

    <!-- Categories Section -->
    <CategoriesSection />

    <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <h2 class="section-title">O projektu</h2>
        <div class="about-content">
          <p>
            Naše webové stránky se zabývají regionální vlastivědou v Brně
            a okolí, turistikou a cestováním po republice i po Evropě. Popisují
            pomníčky, smírčí kříže, studánky a další objekty turistického zájmu v
            okruhu zhruba třiceti kilometrů od Brna.
          </p>
          <p>
            V osmdesátých letech jsme začali hledat pomníčky kolem Brna a dosud
            nepřestali. Počet těchto objektů přesahuje odhadem
            tisícovku a mění se, některé přibývají, jiné zanikají. Doufáme, že tyto
            stránky se mohou stát vaší inspirací k výletům a vyjížďkám do
            spanilého okolí brněnského.
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
              <a href="https://turistapavel.rajce.idnes.cz/" target="_blank" rel="noopener">
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
import HeroSection from "../components/HeroSection.vue";
import CategoriesSection from "../components/CategoriesSection.vue";
import { heroSlides } from "../data/heroSlides";
import { mapaUrl } from "../utils/url";
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

<style>
.icon {
  display: none;
  grid-column: 5/6;
  grid-row: 1/2;
  font-size: 50px;
  justify-content: center;
  align-content: center;
  color: var(--text-primary);
  margin-top: 20px;
  transition: var(--transition);
  cursor: pointer;
  z-index: 100;
  position: relative;
}

.icon:hover {
  color: var(--primary-color);
}

#pocitadlo {
  grid-row: 1/2;
  grid-column: 5/6;
  margin: auto;
  margin-top: 20px;
  z-index: 100;
  position: relative;
}

#mapabutton {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  transition: var(--transition);
}

#mapabutton:hover {
  background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
  box-shadow: var(--shadow-md);
}

@media (max-width: 600px) {
  .icon {
    display: block;
    margin-right: 40px;
    grid-column: 5/6;
    justify-self: end;
  }
  #pocitadlo {
    grid-column: 5/6;
    grid-row: 3/4;
    margin-left: 40px;
    margin-right: 20px;
  }
}
.home {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: minmax(min-content, 100px) auto minmax(min-content, 100px);
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

@media (min-width: 900px) {
  body {
    width: 100vw;
    max-width: 2000px;
    margin: auto;
    background-color: rgb(230, 236, 243);
  }
}

#uvodniText {
  justify-content: center;
  align-items: center;
  line-height: 1.7;
  grid-column: 2 / 6;
  grid-row-start: 2;
  margin: 5%;
  margin-bottom: 0;
  text-align: justify;
  color: var(--text-primary);
  position: relative;
  z-index: 10;
}

#uvodniText h1 {
  font-size: 35px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  margin-bottom: 20px;
}

#uvodniText h2 {
  font-family: "Patrick Hand", cursive;
  color: var(--text-primary);
}

#pozadi {
  grid-row-start: 1;
  grid-column: 1/7;
  grid-row-end: 4;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

#pozadi img,
#pozadi picture {
  grid-column: 1 / 7;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

#pozadi picture {
  width: 100%;
  height: 100%;
}

#transbox {
  grid-column: 1 / 7;
  grid-row: 1 / 4;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(248, 250, 252, 0.65) 100%
  );
  backdrop-filter: blur(2px);
  margin-right: 0;
  position: relative;
  z-index: 2;
  pointer-events: none;
}

footer {
  grid-row: 3/4;
  grid-column: 1/6;
  margin: 0 0 20px 20px;
  padding-top: 40px;
  color: var(--text-primary);
  position: relative;
  z-index: 10;
}

footer a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  border-bottom: 1px solid transparent;
}

footer a:hover {
  color: var(--primary-hover);
  border-bottom-color: var(--primary-hover);
}

@media (max-width: 600px) {
  .home {
    grid-template-rows:
      minmax(min-content, 100px) auto minmax(min-content, 100px)
      minmax(min-content, 100px);
  }

  #uvodniText {
    grid-column: 1/6;
    padding: 5%;
  }

  #uvodniText h1 {
    font-size: 30px;
  }

  #pozadi {
    grid-row: 1/5;
  }

  #transbox {
    grid-row: 1/5;
  }

  footer {
    grid-row: 4/5;
  }
}

@media (max-width: 900px) {
  #pozadi {
    height: 100%;
  }
}

h1 {
  text-align: center;
  color: var(--text-primary);
}

.nav {
  grid-column: 1/2;
  grid-row: 1/4;
  padding: 0;
  display: block;
  gap: 10px;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: 1fr;
  margin: 20px;
  position: relative;
  z-index: 10;
}

.nav a,
.homeButton {
  grid-column: 1/2;
  opacity: 1;
  font-weight: 600;
  text-decoration: none;
  width: 100%;
  height: 50px;
  margin: 5px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  display: flex;
  justify-content: flex-start;
  padding-left: 10%;
  align-items: center;
  text-transform: uppercase;
  box-shadow: var(--shadow-sm);
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  color: var(--button-text-color);
  font-family: "Raleway", sans-serif;
  transition: var(--transition);
  letter-spacing: 0.5px;
}

@media (max-width: 600px) {
  .nav a,
  .nav .homeButton {
    display: none;
  }
}

.nav.responsive a,
.nav.responsive.homeButton {
  display: flex;
}

#uvodniText.responsive {
  display: none;
}

.nav a:hover,
.nav a:active {
  box-shadow: var(--shadow-md);
  color: white;
  border-color: #2a1709;
}

#okno {
  grid-column: 1/7;
  grid-row: 1/43;
  width: 100%;
}

#pomnickyFiltry li {
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

#pomnickyFiltry li:hover {
  background-color: #30524f;
}

.count {
  color: var(--button-text-color);
  font-size: 14px;
  font-weight: 500;
}
</style>
