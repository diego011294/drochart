export interface ProjectCategory {
  title: string;
  items: string[];
}

export interface ProjectSection {
  title: string;
  text: string[];
  images?: string[];
}

export interface Project {
  id: string;
  slug: string;
  type: string;
  title: string;
  shortDescription: string;

  thumbnail: string;
  heroImage: string;

  website?: string;
  figmaUrl?: string;

  categories: ProjectCategory[];

  sections: ProjectSection[];
}

export const PROJECTS: Project[] = [
  {
    id: "dobleuve",
    slug: "dobleuve-artesania",

    type: "Web",
    title: "DOBLEUVE ARTESANÍA",

    shortDescription:
      "Marca gallega de joyería artesanal centrada en la creación de pendientes únicos.",

    thumbnail: "/img/projects/dobleuve/thumbnail.svg",
    heroImage: "/img/projects/dobleuve/hero.png",

    website: "https://dobleuveartesania.es",

    categories: [
      {
        title: "Development",
        items: [
          "React",
          "Vite",
          "Tailwind",
          "Supabase",
          "Stripe",
        ],
      },
      {
        title: "Design",
        items: [
          "UX/UI",
          "Art Direction",
          "Ecommerce",
          "Branding",
        ],
      },
    ],

    sections: [
      {
        title: "Problema",

        text: [
          "Dobleuve Artesanía necesitaba trasladar la esencia de una marca de joyería artesanal a un entorno digital y, al mismo tiempo, facilitar la compra online.",

          "El reto estaba en crear una experiencia sencilla y cuidada que diese protagonismo al producto sin perder la personalidad de la marca.",
        ],

        images: [
          "/img/projects/dobleuve/design-01.webp",
          "/img/projects/dobleuve/design-02.png",
        ],
      },

      {
        title: "Solución",

        text: [
          "Diseñé y desarrollé un ecommerce a medida, desde la estructura y experiencia de usuario hasta la interfaz y el desarrollo frontend.",

          "El resultado combina un catálogo visual, un proceso de compra sencillo y una gestión de productos y pedidos integrada mediante Supabase y Stripe.",
        ],

        images: [
        ],
      },
    ],
  },

  {
    id: "domubox",
    slug: "domubox-import",

    type: "Web",
    title: "DOMUBOX IMPORT",

    shortDescription:
      "Empresa distribuidora de casas modulares y soluciones habitacionales.",

    thumbnail: "/img/projects/domubox/thumbnail.svg",
    heroImage: "/img/projects/domubox/hero.webp",

    website: "https://domuboximport.com",

    categories: [
      {
        title: "Development",
        items: [
          "Next.js",
          "TypeScript",
          "Tailwind",
          "GSAP",
        ],
      },
      {
        title: "Design",
        items: [
          "UX/UI",
          "Art Direction",
          "Web Design",
          "Branding",
        ],
      },
    ],

    sections: [
      {
        title: "Problema",

        text: [
          "DOMUBOX necesitaba presentar su propuesta de casas modulares de forma clara y atractiva.",

          "El reto era explicar un producto que puede resultar complejo a primera vista, mostrando modelos, materiales y posibilidades de forma que el usuario entendiese rápidamente qué ofrece la empresa.",
        ],

        images: [
          "/img/projects/domubox/design-01.webp",
          "/img/projects/domubox/design-02.png",
        ],
      },

      {
        title: "Solución",

        text: [
          "Creé una landing orientada a convertir el interés en contacto, combinando una dirección visual más editorial con una estructura centrada en el producto.",
          "La información se organiza alrededor de los modelos, materiales, proyectos y ventajas de la construcción modular, acompañada de animaciones y elementos interactivos para reforzar la experiencia.",

        ],
      },
    ],
  },

  {
    id: "centro-interactua",
    slug: "centro-interactua",

    type: "Web",
    title: "CENTRO INTERACTÚA",

    shortDescription:
      "Centro de Atención Temprana e intervención infanto-juvenil.",

    thumbnail: "/img/projects/interactua/thumbnail.png",
    heroImage: "/img/projects/interactua/hero.png",

    website: "https://centrointeractua.com",
    figmaUrl: "https://www.figma.com/proto/BYfngecsKvqLx7rQlxVya2/Centro-interact%C3%BAa---web?node-id=7-77&p=f&t=Ff9319Ec0zotvD7S-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A77&show-proto-sidebar=1",

    categories: [
      {
        title: "Design",
        items: [
          "UX/UI",
          "Art Direction",
          "Responsive Design",
        ],
      },
      /*{
        title: "Development",
        items: [
          "WordPress",
          "CSS",
          "JavaScript",
        ],
      }, */
    ],

    sections: [
      {
        title: "Problema",

        text: [
          "Centro Interactúa necesitaba actualizar su presencia digital y hacer más comprensible su propuesta.",

          "La cantidad de servicios y especialidades hacía necesario reorganizar la información para que las familias pudiesen encontrar rápidamente lo que buscaban y entender cómo trabaja el centro.",
        ],

        images: [
          "/img/projects/interactua/design-01.webp",
          "/img/projects/interactua/design-02.png",
        ],
      },
      {
        title: "Solución",

        text: [
          "Rediseñé la experiencia y la estructura de contenidos alrededor de las necesidades de las familias, dando más protagonismo a los profesionales, los servicios y la forma de trabajo del centro.",

          "La nueva propuesta busca transmitir cercanía y confianza sin perder el rigor profesional, facilitando la navegación y el acceso a la información.",
        ],
      },
    ],
  },

 {
  id: "prueba-tecnica",
  slug: "prueba-tecnica",

  type: "Web",
  title: "PRUEBA TÉCNICA",

  shortDescription:
    "Propuesta UX/UI para un e-commerce de calzado con compra de pares asimétricos.",

  thumbnail: "/img/projects/prueba-tecnica/thumbnail.svg",
  heroImage: "/img/projects/prueba-tecnica/hero.png",

  figmaUrl: "https://www.figma.com/proto/BYfngecsKvqLx7rQlxVya2/Dise%C3%B1os---web?node-id=241-4347&p=f&t=jYEm8L3614ggKf0O-1&scaling=min-zoom&content-scaling=fixed&page-id=127%3A2225&starting-point-node-id=241%3A4347&show-proto-sidebar=1",

  categories: [
    {
      title: "Design",
      items: [
        "UX/UI",
        "E-commerce",
        "Interaction Design",
      ],
    },
  ],

  sections: [
    {
      title: "Problema",

      text: [
        "La prueba planteaba diseñar una experiencia de e-commerce para una línea de calzado que permite configurar cada pie de forma independiente.",

        "El principal reto era hacer comprensible este modelo de compra sin recurrir a los patrones habituales de un e-commerce, evitando confusiones durante la selección, el carrito y el proceso de compra.",
      ],

      images: [
        "/img/projects/prueba-tecnica/design-01.jpg",
        "/img/projects/prueba-tecnica/design-02.jpg",
      ],
    },
    {
      title: "Solución",

      text: [
        "Diseñé un configurador guiado que permite seleccionar categoría, modelo, color y talla para cada pie, manteniendo siempre una referencia visual de la selección.",

        "La experiencia se completa con mensajes de prevención de errores, información contextual sobre el producto y un carrito diseñado para hacer especialmente clara la compra de pares diferentes.",
      ],
    },
  ],
},
  
];