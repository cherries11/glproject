import React, {useEffect} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link as RouterLink } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './navbar.css';
import offer1 from './Untitled.png'
import offer2 from './11 Coiffures de mariage pour cheveux mi-longs.jpg'
import offer3 from './Untitled (2).png'
import heroImage from './0c1e930c-6fb5-40b2-8e88-dc0117fddd76.jpg';
import aboutus from './Beauty Salon In UAE.jpg'
import service2 from './54d535bd-1494-417e-8bb0-fd4f2ef0308d.jpg'
import service3 from './4b33c7b7-b3b0-4275-b15d-b8292098a8c0.jpg'
import gallery1 from './Beauty Salon In UAE (1).jpg';
import gallery2 from './Beauty Salon In UAE (5).jpg';
import gallery3 from './Magasin.jpg';
import gallery4 from './Rose Beauty Center Design.jpg';
import gallery5 from './Massage Room - Nada Sobhy.jpg';
import service1 from './téléchargement (3).jpg';
import Navigation1 from '../navigation/navigation1';
import Footer from '../footer/footer';
import teamMembers from "../data/teamMembers";
import { useTranslation } from "react-i18next";
import { Fade } from 'react-awesome-reveal';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Navbar() {




  useEffect(() => {
    // GSAP Animation for #acceuil
    gsap.fromTo(
      "#acceuil",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#acceuil",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
  
    // GSAP Animation for #a-propos
    gsap.fromTo(
      "#a-propos",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#a-propos",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#nos-travaux",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#nos-travaux",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#services",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#services",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#offres",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#offres",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#loyalty",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#loyalty",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#equipes",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#equipes",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#nos-travaux",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#nos-travaux",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#services",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#services",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#contact",
      {
        scale: 0.8,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#contact",
          start: "top 90%",
          end: "center 60%",
          scrub: true,
        },
      }
    );
  }, []);
  

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar'; // Check if the language is Arabic
  

  return (
    <div className="App bg-background" >
   <Navigation1></Navigation1>

<section id="acceuil"
  className="hero relative w-full h-screen"
  style={{
    backgroundImage:  `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
 

  {/* Text Content */}
  <div className="absolute top-1/4 left-24 text-left  text-black" id="acceuil">
  <Fade direction="down" cascade damping={0.2}>
    <h1 className="text-4xl font-calandea md:italic mb-4 sm:text-5xl md:text-6xl">
    {t("Réservez votre beauté en")} <br />
    {t("un clic")}
    </h1>
    </Fade>
    <Fade direction="down" cascade damping={0.2} >
    <h2 className="text-1xl font-calandea mb-4 sm:text-3xl md:text-2xl ">
  {t("Des experts en coiffure, soins et massages à votre service, où que")} <br />
  {t("vous soyez.")}
</h2>
</Fade>

    <button className="bg-new font-calandea mt-2 text-white hover:bg-hover  font-bold py-3 px-5 rounded-lg">
      <RouterLink to="offres">{t("BOOK NOW")}</RouterLink>
    </button>
  </div>
</section>

<section
  id="a-propos"
  className="about-us bg-background flex flex-col-reverse md:flex-row items-stretch gap-6 md:gap-12 mx-6 md:mx-16 mt-10 md:mt-20"
>
  {/* Text Container */}
  <div className="text-container bg-white px-6 py-8 md:px-14 md:py-16 flex-1">
    <Fade cascade damping={0.8} triggerOnce>
      <h2 className="text-3xl md:text-5xl text-black font-serif mt-4 md:mt-6 mb-6 md:mb-12">
        {t("À propos de nous")}
      </h2>
      <p className="text-gray-700 text-start md:text-lg leading-7 md:leading-8">
        {t(
          "Bienvenue dans notre salon de beauté de luxe, où chaque détail est conçu pour offrir une expérience de bien-être exceptionnelle. Nos experts passionnés combinent des techniques modernes avec une touche personnalisée pour répondre à toutes vos attentes. Que ce soit pour une coupe de cheveux élégante, un soin visage raffiné ou un moment de relaxation absolue, nous sommes là pour sublimer votre beauté et votre confiance."
        )}
      </p>
    </Fade>
  </div>

  {/* Image Container */}
  <div className="image-container flex-[1] relative h-64 md:h-auto">
    <img
      src={aboutus}
      alt="Notre Salon"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
  </div>
</section>



<section id="nos-travaux" className="mx-12 mt-16">
  {/* Title */}
  <h2
    className={`text-4xl ${isArabic ? 'text-right' : 'text-left'} text-black tracking-wider mb-16 font-caladea`}
  >
    {t("NOTRE GALERIE")}
  </h2>

  {/* Swiper Carousel */}
  <div className="w-full">
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      centeredSlides={true}
      spaceBetween={50}
      slidesPerView={3}
      loop={true}
      breakpoints={{
        1024: {
          slidesPerView: 3, // Show 3 slides for large screens
        },
        768: {
          slidesPerView: 2, // Show 2 slides for medium screens
        },
        480: {
          slidesPerView: 1, // Show 1 slide for small screens
        },
        0: {
          slidesPerView: 1, // Default to 1 slide for extra small screens
        },
      }}
      className=""
    >
      {/* Swiper Slides */}
      {[
        { img: gallery4, alt: "salon image 4" },
        { img: gallery1, alt: "salon image 1" },
        { img: gallery2, alt: "salon image 2" },
        { img: gallery5, alt: "salon image 5" },
        { img: gallery3, alt: "salon image 3" },
      ].map((service, index) => (
        <SwiperSlide key={index} className="slide-item">
          <div className="bg-white overflow-hidden transform hover:scale-105 transition-all duration-500">
            <img
              src={service.img}
              alt={service.alt}
              className="w-full h-[400px] object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>

<section id="services" className="bg-background mx-12 mt-16 py-12">
  {/* Title */}
  <h2 className=" text-4xl font-caladea text-start text-black mb-12">
    {t("SERVICES")}
  </h2>

  {/* Card Container */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="bg-background shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={service1} alt="Soins esthétiques" className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold font-caladea text-gray-800 mb-2">
          {t("Soins esthétiques")}
        </h3>
        <p className="text-gray-700">
          {t("Sublimez votre beauté avec nos soins visage et corps professionnels.")}
        </p>
        <button className="bg-new text-white mt-4 hover:bg-hover font-bold py-2 px-6 rounded-md transform transition duration-300 hover:scale-105">
          <RouterLink to="/offres">{t("VIEW MORE")}</RouterLink>
        </button>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-background shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={service2} alt="Massage" className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-caladea font-semibold text-gray-800 mb-2">
          {t("Massage")}
        </h3>
        <p className="text-gray-700 font-caladea">
          {t("Détendez-vous avec nos options de massage, disponibles à domicile ou en salon.")}
        </p>
        <button className="bg-new text-white mt-4 hover:bg-hover font-bold py-2 px-6 rounded-md transform transition duration-300 hover:scale-105">
          <RouterLink to="/offres">{t("VIEW MORE")}</RouterLink>
        </button>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-background shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={service3} alt="Coiffure" className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-caladea font-semibold text-gray-800 mb-2">
          {t("Coiffure")}
        </h3>
        <p className="text-gray-700 font-caladea">
          {t("Réservez une coupe, une couleur ou un brushing avec nos experts.")}
        </p>
        <button className="bg-new text-white mt-4 hover:bg-hover font-bold py-2 px-6 rounded-md transform transition duration-300 hover:scale-105">
          <RouterLink to="/offres">{t("VIEW MORE")}</RouterLink>
        </button>
      </div>
    </div>
  </div>
</section>



<section id="offres" className="bg-white">
  <div className="mx-12 mt-16">
    <h2 className="text-4xl font-caladea text-start text-black mb-12">
      {t("OFFRES EXCLUSIVES")}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* Card 1 */}
      <div className="offer-card bg-background shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <img src={offer1} alt="Offre 1" className="w-full h-60 object-cover"/>
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-black mb-4">
            {t("Soin du visage de luxe")}
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            {t("Profitez de 20% de réduction sur notre soin du visage signature pour une durée limitée.")}
          </p>
          <p className="text-base font-bold text-new">
            {t("Code Promo")}: <span className="text-black">SAVE20</span>
          </p>
          <button className="bg-new text-white mt-4 hover:bg-hover font-bold py-2 px-6 rounded-md transform transition duration-300 hover:scale-105">
            <RouterLink to="/offres">{t("Réservez maintenant")}</RouterLink>
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="offer-card bg-background shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <img src={offer2} alt="Offre 2" className="w-full h-60 object-cover"/>
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-black mb-4">
            {t("Coiffure et Coloration")}
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            {t("Profitez de 25% de réduction sur toute prestation de coloration et de coiffure.")}
          </p>
          <p className="text-base font-bold text-new">
            {t("Code Promo")}: <span className="text-black">SAVE25</span>
          </p>
          <button className="bg-new text-white mt-4 hover:bg-hover font-bold py-2 px-6 rounded-md transform transition duration-300 hover:scale-105">
            <RouterLink to="/offres">{t("Réservez maintenant")}</RouterLink>
          </button>
        </div>
      </div>

      {/* Card 3 */}
      <div className="offer-card bg-background shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <img src={offer3} alt="Offre 3" className="w-full h-60 object-cover bg-opacity-20"/>
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-black mb-4">
            {t("Forfait Spa Complet")}
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            {t("Détendez-vous avec un forfait spa complet à -30% ! Places limitées disponibles.")}
          </p>
          <p className="text-base font-bold text-new">
            {t("Code Promo")}: <span className="text-black">SAVE30</span>
          </p>
          <button className="bg-new text-white mt-4 hover:bg-hover font-bold py-2 px-6 rounded-md transform transition duration-300 hover:scale-105">
            <RouterLink to="/offres">{t("Réservez maintenant")}</RouterLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="loyalty" className="bg-background mx-12 mt-16 py-12">
  {/* Title */}
  <h2 className="text-4xl font-caladea text-start text-black mb-12">
    {t("PROGRAMME DE POINTS")}
  </h2>

  {/* Content */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1: How It Works */}
    <div className="bg-background shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="p-6">
        <h3 className="text-xl font-caladea font-semibold text-gray-800 mb-4">
          {t("Comment ça marche ?")}
        </h3>
        <p className="text-gray-700 font-caladea text-start">
          {t("Gagnez des points à chaque réservation et échangez-les contre des réductions ou des offres spéciales. Plus vous réservez, plus vous économisez !")}
        </p>
      </div>
    </div>

    {/* Card 2: Benefits */}
    <div className="bg-background shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="p-6">
        <h3 className="text-xl font-caladea font-semibold text-gray-800 mb-4">
          {t("Vos Avantages")}
        </h3>
        <ul className="list-disc ml-4 text-start text-gray-700 font-caladea">
          <li>{t("1 point pour chaque 1€ dépensé")}</li>
          <li>{t("100 points = 10€ de réduction")}</li>
          <li>{t("Accès à des offres exclusives")}</li>
        </ul>
      </div>
    </div>

    {/* Card 3: Start Earning Points */}
    <div className="bg-background shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="p-6">
        <h3 className="text-xl font-caladea font-semibold text-gray-800 mb-4">
          {t("Commencez à Gagner")}
        </h3>
        <p className="text-gray-700 font-caladea mb-4 text-start">
          {t("Inscrivez-vous et commencez à accumuler des points dès votre prochaine réservation. Vérifiez vos points dans votre profil.")}
        </p>
        <button className="bg-new text-white mt-4 hover:bg-hover font-bold py-2 px-6 rounded-md transform transition duration-300 hover:scale-105">
          <RouterLink to="/signup">{t("Rejoignez Maintenant")}</RouterLink>
        </button>
      </div>
    </div>
  </div>
</section>



<div id="equipes" className="mx-12 mt-20 text-center">
  <h1 className="text-4xl font-caladea font-thin text-left text-black">ÉQUIPES</h1>
  <Swiper
    modules={[Pagination, Navigation]}
    spaceBetween={30}
    slidesPerView={4}
    navigation
    pagination={{ clickable: true }}
    breakpoints={{
      1024: { slidesPerView: 4 }, // 4 slides for large screens
      768: { slidesPerView: 2 },  // 2 slides for medium screens
      640: { slidesPerView: 1 },  // 1 slide for small screens
      0: { slidesPerView: 1 },    // Default to 1 slide for extra small screens
    }}
    className="w-full min-h-[700px]"
  >
    {teamMembers.map((member, index) => (
      <SwiperSlide key={index} className="slide-item">
        <div className="bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-500 min-h-[600px] flex flex-col justify-between">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-[200px] object-cover object-center rounded-lg mb-4"
          />
          <h3 className="font-caladea text-xl font-semibold">{t(member.name)}</h3>
          <h4 className="font-caladea text-lg text-gray-500 italic">{t(member.role)}</h4>
          <p className="font-caladea text-sm text-gray-700 mt-4 flex-1">
            {t(member.description)}
          </p>
          <RouterLink
            to={`/portfolio/${encodeURIComponent(member.name)}`}
            className="mt-4 text-blue-500"
          >
            Voir le Portfolio
          </RouterLink>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

    <div id="contact" className="mx-12 mt-20 mb-20" style={{ textAlign: "center" }}>
  {/* Title */}
  <h2 className="text-4xl font-caladea text-start text-balck mb-12">CONTACT</h2>

  {/* Main Content */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Left Section: Contact Form */}
    <div className="flex flex-col space-y-4 p-6">
      <input
        type="text"
        placeholder="Nom"
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="tel"
        placeholder="Téléphone"
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Adresse e-mail"
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Message"
        rows="4"
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button
        type="submit"
        className="bg-new text-white p-3 rounded-lg hover:bg-hover transition"
      >
        CONTACTEZ-NOUS
      </button>
    </div>

    <div className="flex items-center justify-center p-6">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d819262.548654309!2d4.326821801581238!3d36.66862603123966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f25fda783fa233%3A0x5c1a0ee8891d7d9a!2sDZ%20BEAUTE!5e0!3m2!1sfr!2sdz!4v1732373634698!5m2!1sfr!2sdz"
        width="100%"
        height="400"
        style={{ border: "none", borderRadius: "8px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map of DZ BEAUTE"
      ></iframe>
    </div>
  </div>
</div>


<Footer></Footer>

    </div>
  );
}

export default Navbar;