import member1 from './Luxe22Salon_12.22_KelsieCarlson-114.jpg';
import member2 from './Luxe22Salon_12.22_KelsieCarlson-126.jpg';
import member3 from './Luxe22Salon_12.22_KelsieCarlson-68.jpg';
import member4 from './Luxe22Salon_12.22_KelsieCarlson-81.jpg';
import member0 from "../images/Luxe22Salon_12.22_KelsieCarlson-28.jpg"
import service1i1 from '../images/7d6565dd-e2de-4113-972b-0eeab4990ee7.jpg';
import service1i2 from '../images/76d5d886-0feb-4a3f-832c-3965cb5b634c.jpg';
import service1i3 from '../images/hair inspo.jpg';
import service1i4 from '../images/Todo lo que tienes que saber sobre el botox para el cabello.jpg';
import service2i1 from '../images/92df0a97-a3eb-4c10-95e6-aa92757ed37d.jpg';
import service2i2 from '../images/e0b376b6-21a9-414a-835e-e0dcd9b4ff75.jpg';
import service2i3 from '../images/Hair Straightening Treatment.jpg';
import service2i4 from '../images/Curtain haircuts balayage brown hair blonde hair summer hair inspo long hair highlights hair layered.jpg';
import service3i1 from "../images/72 Hour Cleanse & Detox — The Habit Ayurveda.jpg";
import service3i2 from "../images//Masseur doet een voetmassage met kaarsen op de achtergrond Hoge kwaliteit foto _ Premium Foto.jpg";
import service3i3 from "../images/ed04bb6f-b39e-430f-bb43-767bba145bed.jpg";
import service4i1 from "../images/wine treatment.jpg";
import service4i2 from "../images/aaef2e75-80f1-4f36-834c-39a076ed4a4a.jpg";
import service5i1 from "../images/Fany Esthetics (@fany_esthetics) • Instagram….jpg";
import service5i2 from "../images/BB Glow_ The Ultimate Guide - All You Need to Know.jpg";
import service5i3 from "../images/Laser Hair Reduction & Removal PERMANENT HAIR REMOVAL & REDUCTION.jpg";
import service6i1 from "../images/HYDRAFACIAL - avant_après.jpg";
import service6i2 from "../images/CLEAN GIRL AESTHETIC _ DIY BODY SCRUB _ WINTER SKINCARE.jpg";
import service6i3 from "../images/19a83c54-2320-42f8-a61e-f37ec61aff16.jpg";

const portfoliInfo = [
  {
    name: "Antoine Lefevre",
    role: "Présidente",
    description:
      "Antoine est le président visionnaire et dynamique de notre entreprise, avec plus de 15 ans d'expérience...",
    image: member0,
    portfolio: [
      { image: "portfolio_image1" },
      { image: "portfolio_image2" },
      { image: "portfolio_image3" },
    ],
    skills: ["Leadership", "Management", "Vision stratégique"],
    email: "antoine.lefevre@example.com",
    phone: "+33 6 12 34 56 78",
    socials: {
      linkedin: "https://linkedin.com/in/antoinelefevre",
      instagram: "https://instagram.com/antoine.lefevre",
    },
  },
  {
    name: "Elizabeth Newman",
    role: "Coiffeuse",
    description:
      "Renata est une coiffeuse talentueuse avec 17 ans d'expérience, spécialisée dans les techniques de coloration...",
    image: member2,
    portfolio: [
      { image: service1i1 },
      { image: service1i2 },
      { image: service1i3 },
      { image: service1i4 },
    ],
    skills: ["Coloration", "Balayage", "Coupe stylisée", "Soin des cheveux"],
    email: "elizabeth.newman@example.com",
    phone: "+33 6 23 45 67 89",
    socials: {
      linkedin: "https://linkedin.com/in/elizabethnewman",
      instagram: "https://instagram.com/elizabeth.newman",
    },
  },
  {
    name: "Lucy Lennon",
    role: "Coiffeuse",
    description:
      "Yuko est une coloriste expérimentée, formée au Japon et à New York. Reconnue pour son perfectionnisme...",
    image: member3,
    portfolio: [
      { image: service2i1 },
      { image: service2i2 },
      { image: service2i3 },
      { image: service2i4 },
    ],
    skills: ["Coloration", "Lissage", "Balayage", "Techniques modernes"],
    email: "lucy.lennon@example.com",
    phone: "+33 6 34 56 78 90",
    socials: {
      linkedin: "https://linkedin.com/in/lucylennon",
      instagram: "https://instagram.com/lucy.lennon",
    },
  },
  {
    name: "Jennifer Smith",
    role: "Masseuse",
    description:
      "Amélie est une masseuse professionnelle avec plus de 15 ans d'expérience, spécialisée dans une large gamme...",
    image: member4,
    portfolio: [
      { image: service3i1 },
      { image: service3i2 },
      { image: service3i3 },
    ],
    skills: ["Massage relaxant", "Thérapie musculaire", "Aromathérapie"],
    email: "jennifer.smith@example.com",
    phone: "+33 6 45 67 89 01",
    socials: {
      linkedin: "https://linkedin.com/in/jennifersmith",
      instagram: "https://instagram.com/jennifer.smith",
    },
  },
  {
    name: "Jack Hendrix",
    role: "Masseuse",
    description:
      "Lucie est une experte en massages avec plus de 10 ans d'expérience dans l'art du bien-être corporel...",
    image: member1,
    portfolio: [
      { image: service4i1 },
      { image: service4i2 },
    ],
    skills: ["Massage suédois", "Réflexologie", "Massage sportif"],
    email: "jack.hendrix@example.com",
    phone: "+33 6 56 78 90 12",
    socials: {
      linkedin: "https://linkedin.com/in/jackhendrix",
      instagram: "https://instagram.com/jack.hendrix",
    },
  },
  {
    name: "Claire Dubois",
    role: " praticienne en esthétique ",
    description:
      "Claire est une experte en soins du visage, du corps et épilation, avec plus de 10 ans d'expérience...",
    image: member3,
    portfolio: [
      { image: service5i1 },
      { image: service5i2 },
      { image: service5i3 },
    ],
    skills: ["Soins du visage", "Épilation", "Gommage corporel"],
    email: "claire.dubois@example.com",
    phone: "+33 6 67 89 01 23",
    socials: {
      linkedin: "https://linkedin.com/in/clairedubois",
      instagram: "https://instagram.com/claire.dubois",
    },
  },
  {
    name: "Élodie Lefevre",
    role: " praticienne en esthétique ",
    description:
      "Élodie est spécialisée dans les soins du visage, du corps et l'épilation, avec plus de 8 ans d'expérience...",
    image: member4,
    portfolio: [
      { image: service6i1 },
      { image: service6i2 },
      { image: service6i3 },
    ],
    skills: ["Soins du visage", "Massage corporel", "Épilation douce"],
    email: "elodie.lefevre@example.com",
    phone: "+33 6 78 90 12 34",
    socials: {
      linkedin: "https://linkedin.com/in/elodie-lefevre",
      instagram: "https://instagram.com/elodie.lefevre",
    },
  },
];

export default portfoliInfo;
