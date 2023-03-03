import React from "react";
import "../../../Styles/css/MenuP.css";
//npm i -d sass - INSTALAR para usar el menu
const Home = () => {
  //24-02-23
  return (
    <div>
      <html>
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="../../Styles/css/MenuP.css" />
        </head>

        <header></header>

        <main>
          <div className="fondoM">
            <section className="home container1" id="home">
              <div className="swiper home-swiper" id="wiper">
                <div className="swiper-wrapper">
                  <section className="swiper-slide">
                    <div className="home__content grid">
                      <div className="home__group"></div>
                      <div></div>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>
          <section></section>
        </main>
        <body>
          <footer className="footer section" id="foot">
            <div className="footer__container container grid">
              <div className="footer__content">
                <a
                  href="https://goo.gl/maps/p52hmMxoGnToaB5D7"
                  target="_blank"
                  className="footer__logo"
                >
                  Av. Américas Sector Entrada La Católica
                </a>
                <p className="footer__description">Od. Jonnathan SanMartin</p>

                <div className="footer__social">
                  <a
                    href="https://www.facebook.com/profile.php?id=100088220704362"
                    target="_blank"
                    className="footer__social-link"
                  >
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/sm__odontologia/?fbclid=IwAR2l-7dgpuh5p3f2v7xvOdSOWfzKM3rI6MOGq_CKTN86CFW7eVxXtBREILcm"
                    target="_blank"
                    className="footer__social-link"
                  >
                    <i className="bx bxl-instagram-alt"></i>
                  </a>
                  <a
                    href="https://wa.me/0990369421"
                    target="_blank"
                    className="footer__social-link"
                  >
                    <i className="bx bxl-whatsapp"></i>
                  </a>
                </div>
              </div>

              <div className="footer__content">
                <h3 className="footer__title">
                  Odontología General y Preventiva
                </h3>
              </div>

              <div className="footer__content">
                <ul className="footer__links">
                  <li>
                    <a className="footer__link">- Restauraciones</a>
                  </li>
                  <li>
                    <a className="footer__link">- Profilaxis</a>
                  </li>
                  <li>
                    <a className="footer__link">- Diagnóstico</a>
                  </li>
                  <li>
                    <a className="footer__link">- Prótesis Dentales</a>
                  </li>
                  <li>
                    <a className="footer__link">- Blanqueamiento</a>
                  </li>
                </ul>
              </div>

              <div className="footer__content">
                <ul className="footer__links">
                  <li>
                    <a className="footer__link">- Odontopediatría</a>
                  </li>
                  <li>
                    <a className="footer__link">- Endodoncia</a>
                  </li>
                  <li>
                    <a className="footer__link">- Ortodoncia</a>
                  </li>
                  <li>
                    <a className="footer__link">- Extracciones</a>
                  </li>
                  <li>
                    <a className="footer__link">- Cirugía</a>
                  </li>
                </ul>
              </div>
            </div>

            <span className="footer__copy">&#169; Derechos Reservados</span>
            <div className="footer__img-one"></div>
            <div className="footer__img-two"></div>
          </footer>
        </body>
      </html>
    </div>
  );
};

export default Home;
