

import worker1 from './Luxe22Salon_12.22_KelsieCarlson-114.jpg';
import worker2 from './Luxe22Salon_12.22_KelsieCarlson-126.jpg';
import worker3 from './Luxe22Salon_12.22_KelsieCarlson-68.jpg';
import worker4 from './Luxe22Salon_12.22_KelsieCarlson-81.jpg';
import worker5 from "./Luxe22Salon_12.22_KelsieCarlson-68.jpg";
import worker6 from "./Luxe22Salon_12.22_KelsieCarlson-81.jpg";

const data = {
    coiffure: {
      subServices: {
        "Coupe et coiffage": [
          {
            workerName: "Elizabeth Newman",
            workerImage:worker1,
            service: "Coupe et coiffage",
            price: "2000DA",
          },
          {
            workerName: "Luccy Lennon",
            workerImage: worker2,
            service: "Coupe et coiffage",
            price: "2500DA",
          },
        ],
        "Coloration capillaire": [
          {
            workerName: "Elizabeth Newman",
            workerImage: worker1,
            service: "Coloration capillaire",
            price: "3000DA",
          },  {
            workerName: "Luccy Lennon",
            workerImage: worker2,
            service: "Coloration capillaire",
            price: "3200DA",
          },
        ],
        "Soins capillaires": [
          {
            workerName: "Elizabeth Newman",
            workerImage: worker1,
            service: "Soins capillaires",
            price: "3500DA",
          },{
            workerName: "Luccy Lennon",
            workerImage: worker2,
            service: "Soins capillaires",
            price: "3400DA",
          },
        ],
      },
    },
    massage: {
      subServices: {
        "Massage relaxant": [
          {
            workerName: "Jennifer Smith",
            workerImage: worker3,
            service: "Massage relaxant",
            price: "2000DA",
          },
          {
            workerName: "Jack Hendrix",
            workerImage: worker4,
            service: "Massage relaxant",
            price: "1800DA",
          },
        ],
        "Massage tonifiant": [
          {
            workerName: "Jennifer Smith",
            workerImage: worker3,
            service: "Massage tonifiant",
            price: "2800DA",
          },          {
            workerName: "Jack Hendrix",
            workerImage: worker4,
            service: "Massage tonifiant",
            price: "2600DA",
          },
        ],
        "Massage thérapeutique": [
          {
            workerName: "Jennifer Smith",
            workerImage: worker3,
            service: "Massage thérapeutique",
            price: "3500DA",
          }, {
            workerName: "Jack Hendrix",
            workerImage: worker4,
            service: "Massage thérapeutique",
            price: "3750DA",
          },
        ],
      },
    },
    soins: {
      subServices: {
        "Soins du visage": [
          {
            workerName: "Claire Dubois",
            workerImage: worker5,
            service: "Soins du visage",
            price: "4000DA",
          }, {
            workerName: "Elodie lefevre",
            workerImage: worker6,
            service: "Soins du visage",
            price: "3900DA",
          },
        ],
        "Soins du corps": [
          {
            workerName: "Claire Dubois",
            workerImage: worker5,
            service: "Soins du corps",
            price: "4000DA",
          }, {
            workerName: "Elodie lefevre",
            workerImage: worker6,
            service: "Soins du corps",
            price: "4500DA",
          },
        ],
        "Épilation": [
          {
            workerName: "Claire Dubois",
            workerImage: worker5,
            service: "Épilation",
            price: "10000DA",
          },{
            workerName: "Elodie lefevre",
            workerImage: worker6,
            service: "Épilation",
            price: "10000DA",
          },
        ],
      },
    },
  };
export default data;