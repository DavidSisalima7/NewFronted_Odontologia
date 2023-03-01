import React from "react";
import "../../../Styles/css/MenuP.css"
//npm install boxicons --save
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
             <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
    />
          <link rel="stylesheet" href="../../Styles/css/MenuP.css" />
        </head>

        <header></header>

        <main>
          <div className="fondo">
            <section className="home container1" id="home">
              <div className="swiper home-swiper" id="swiper">
                <div className="swiper-wrapper">
                  <section className="swiper-slide">
                    <div className="home__content grid">
                      <div className="home__group"></div>
                      <div>
                        <div className="slider-frame">
                          <ul className="ulS">
                            <li className="liS">
                              <div className="Serv1"></div>
                              <h3 className="home__subtitle">
                              Carillas Dentales
                              </h3>
                              <p className="home__description">
                              Son una buena opción para dientes fracturados, 
                              espacios entre los dientes y para algunas situaciones 
                              en las que la posición de los dientes se ve comprometida y 
                              existen problemas menores relacionados con la oclusión.
                              </p>
                            </li>
                            <li className="liS">
                              <div className="Serv2"></div>
                              <h3 className="home__subtitle">
                              Ortodoncia
                              </h3>
                              <p className="home__description">
                              El crecimiento y desarrollo de los dientes en una posición 
                              errónea supone un riesgo para el cuidado de la higiene oral.
                              </p>
                            </li>
                            <li className="liS">
                              <div className="Serv3"></div>
                              <h3 className="home__subtitle">
                              Protesis Dentales
                              </h3>
                              <p className="home__description">
                              La prótesis dental ayuda a evitar el desplazamiento de los dientes 
                              naturales restantes. La presencia de la prótesis impide que los 
                              dientes naturales se desplacen hacia la zona desdentada. 
                              </p>
                            </li>
                            <li className="liS">
                              <div className="Serv4"></div>
                              <h3 className="home__subtitle">
                              Profilaxis Dental
                              </h3>
                              <p className="home__description">
                              Permite eliminar la placa y el sarro acumulado, previene la aparición de caries 
                              y enfermedades periodontales, evita el temido mal aliento y, además, refuerza el 
                              esmalte protegiendo a las piezas dentales. 
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>
          <section></section>
        </main>
        {/* //foooter */}
        <body>
          <footer className="footer section" id="foot">
            <div className="footer__container container grid">
              <div className="footer__content">
                <a
                  href="https://goo.gl/maps/p52hmMxoGnToaB5D7"
                  target="_blank"
                  className="footer__logo"
                >
                  <img
                    src="../../Image/iconos/marcador.png"
                    alt=""
                    className="footer__logo-img"
                  />
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
                    href="https://wa.me/593990369421"
                    target="_blank"
                    className="footer__social-link">
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
                <a className="footer__link">- Restauraciones</a>
                <ul className="footer__links">
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
                <a className="footer__link">- Odontopediatría</a>
                <ul className="footer__links">
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
          <a href="#" className="scrollup" id="scroll-up">
            <i className="bx bx-up-arrow-alt scrollup__icon"></i>
          </a>
        </body>
      </html>
    </div>
  );
};

export default Home;
