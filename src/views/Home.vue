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

