import { padding } from "@mui/system";
import React from "react";
import "../../Styles/css/Bienvenida.css";

const Bienvenida = () => {
  return (
    <div>
      <body className="body2" id="Principal">
        <nav>
          <div className="icon_diente"></div>
          <div id="logo">Odontología Integral SM</div>
          <label htmlFor="drop" className="toggle">
            Menu
          </label>
          <input type="checkbox" id="drop" />
          <ul className="menu">
            <li>
              <label htmlFor="drop" className="toggle">
                Home
              </label>
              <a href="#Principal">
                <div className="Home"></div>
              </a>
            </li>
            <li>
              <a href="#service">
                <div className="">Services</div>
              </a>
            </li>
            <li>
              <a href="#about">
                <div className="about">About Us</div>
              </a>
            </li>
            <li className="liP">
            <label htmlFor="drop" className="toggle">
                Contact Us
              </label>
              <a href="https://wa.me/593990369421" target="_blank" className="aPhone">
                <div className="phone"></div>Contact Us
              </a>
            </li>
            <li className="liLog">
            <label htmlFor="drop" className="toggle">
               Login
              </label>
            <a href="/auth/login" className="aLog">
                <div>Login</div>
              </a>
            </li>
          </ul>
        </nav>
      </body>
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
          <div className="fondo">
            <section className="home container1" id="home">
              <div className="swiper home-swiper" id="wiper">
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
                                espacios entre los dientes y para algunas
                                situaciones en las que la posición de los
                                dientes se ve comprometida y existen problemas
                                menores relacionados con la oclusión.
                              </p>
                            </li>
                            <li className="liS">
                              <div className="Serv2"></div>
                              <h3 className="home__subtitle">Ortodoncia</h3>
                              <p className="home__description">
                                El crecimiento y desarrollo de los dientes en
                                una posición errónea supone un riesgo para el
                                cuidado de la higiene oral.
                              </p>
                            </li>
                            <li className="liS">
                              <div className="Serv3"></div>
                              <h3 className="home__subtitle">
                                Protesis Dentales
                              </h3>
                              <p className="home__description">
                                La prótesis dental ayuda a evitar el
                                desplazamiento de los dientes naturales
                                restantes. La presencia de la prótesis impide
                                que los dientes naturales se desplacen hacia la
                                zona desdentada.
                              </p>
                            </li>
                            <li className="liS">
                              <div className="Serv4"></div>
                              <h3 className="home__subtitle">
                                Profilaxis Dental
                              </h3>
                              <p className="home__description">
                                Permite eliminar la placa y el sarro acumulado,
                                previene la aparición de caries y enfermedades
                                periodontales, evita el temido mal aliento y,
                                además, refuerza el esmalte protegiendo a las
                                piezas dentales.
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

          {/* ///segunda seccion SERVICIOS */}
          <div className="fondo3" id="service">
          <section className="section trick" id="trick">
     
        <h2 className="section__title">Nuestros Servicios</h2>

        <div className="trick__container container grid">
          <div className="trick__content">
            <div className="S1"></div>
            <h3 className="trick__title">Ortodoncia</h3>
          </div>

          <div className="trick__content">
          <div className="S2"></div>
            <h3 className="trick__title">Profilaxis</h3>
          </div>

          <div className="trick__content">
          <div className="S3"></div>
            <h3 className="trick__title">Prótesis Dentales</h3>
          </div>

          <div className="trick__content">
          <div className="S4"></div>
            <h3 className="trick__title">Blanqueamiento</h3>
          </div>

          <div className="trick__content">
          <div className="S5"></div>
            <h3 className="trick__title">Odontopediatría</h3>
          </div>

          <div className="trick__content">
          <div className="S6"></div>
            <h3 className="trick__title">Diagnóstico</h3>
          </div>
          <div className="trick__content">
          <div className="S7"></div>
            <h3 className="trick__title">Endodoncia</h3>
          </div>
          <div className="trick__content">
          <div className="S8"></div>
            <h3 className="trick__title">Extracciones</h3>
          </div>
        </div>
        </section>
        </div>



          {/* //acerca de */}
          <div className="fondo2">
            <section className="section about" id="about">
              <div className="about__container container grid">
                <div className="about__data">
                  <h2 className="section__title about__title">
                    Acerca de Nosotros
                  </h2>
                  <p className="about__description">
                    Odontologia Integral "SM" es una organización que pretende ser
                    un referente a seguir dentro del sector de la odontología,
                    por la calidad de su trabajo y actitud humana. Por ello,
                    prestamos especial atención al tratamiento deseado de
                    nuestros pacientes y utilizamos todo nuestro conocimiento
                    para solucionar sus problemas de salud dental de la forma
                    más adecuada.
                  </p>
                </div>
                <div className="Servabout"></div>
              </div>
            </section>
          </div>
       </main>
        {/* //foooter */}
        <body>
          <footer className="footer section" id="foot">
            <div className="footer__container container grid">
              <div className="footer__content">
                <a
                  href="https://goo.gl/maps/p52hmMxoGnToaB5D7"
                  target="_blank"
                  className="footer__logo">  
                  Av. Américas Sector Entrada La Católica
                </a>
                <p className="footer__description">Od. Jonnathan SanMartin</p>

                <div className="footer__social">
                  <a
                    href="https://www.facebook.com/profile.php?id=100088220704362"
                    target="_blank"
                    className="footer__social-link">
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
          <a href="#" className="scrollup" id="scroll-up">
            <div className="scrollicon"></div>
          </a>
        </body>
      </html>
    </div>
  );
};

export default Bienvenida;
