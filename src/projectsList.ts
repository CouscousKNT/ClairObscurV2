// Interfaces pour les crédits
interface RealisationProduction {
  realisation?: string[];
  producteur?: string[];
}

interface ImageSon {
  dop?: string[]; // Directeur de la photographie
  cameras?: string[];
  son?: string[];
}

interface PostProduction {
  montage?: string[];
  etalonnage?: string[];
  vfx?: string[];
}

export interface Credits {
  realisationProduction?: RealisationProduction;
  imageSon?: ImageSon;
  postProduction?: PostProduction;
}



// Définition des types/interfaces
export interface Project {
  name: string;
  brand: string;
  date?: string;
  imagePreview: string;
  preview: string;
  previewWebm: string;
  description?: string;
  projectUrl: string;
  videoUrl?: string; // URL de la vidéo (optionnelle)
  credits?: Credits;
  keyImages?: string[]; // Liste des URLs des images clés
}

interface ProjectYear {
  year: string;
  projects: Project[];
}



// Type pour la liste complète
type ProjectsList = ProjectYear[];

// Vos données avec le typage
export const projectsList: ProjectsList = [
  {
    year: "2025",
    projects: [
      {
        name: "Héritage",
        brand: "Roude",
        date: "2025",
        imagePreview: "/images/projects/heritage/imgRoude1.webp",
        preview: "/videos/preview/RoudePreviewCompressed.mp4",
        previewWebm: "/videos/preview/RoudePreview.webm",
        description: `Ici chaque balcon raconte une émotion
                      la joie, la créativité, le partage, l’amour...
                      Cet immeuble dans un quartier n’est pas juste des briques et du béton,
  `,
        projectUrl: "/heritage",
        credits: {
          realisationProduction: {
            realisation: ["Clair Obscur"],
            producteur: ["xxxxxx"]
          },
          imageSon: {
            dop: ["xxxxxx"],
            cameras: ["xxxxxx", "xxxxxx", "xxxxxx"],
            son: ["xxxxxx"]
          },
          postProduction: {
            montage: ["xxxxxx", "xxxxxx"],
            etalonnage: ["xxxxxx"],
            vfx: ["xxxxxx", "xxxxxx"]
          }
        },
                keyImages: [
          "/images/projects/heritage/img6.png",
          "/images/projects/heritage/img2.png",
          "/images/projects/heritage/img3.png",
          "/images/projects/heritage/img4.png",
          "/images/projects/heritage/img5.png",
        ],
      },
      {
        name: "La grande échappée",
        brand: "Moluki",
        date: "2025",
        imagePreview: "/images/projects/la_grande_echappee/imgMoluki1.webp",
        preview: "/videos/preview/LaGrandeEchappeePreviewCompressed.mp4",
        previewWebm: "/videos/preview/LaGrandeEchappeePreview.webm",
        description: `Dans l'éclat romantique de Paris, chaque rue résonne d'histoires
                d'amour. Alors, au détour d'un café et d'un foulard perdu,
                laissez-vous emporter par la magie des rencontres fortuites, où
                le hasard danse avec l'amour dans les ruelles de Montmartre.`,
        projectUrl: "/la-grande-echappee",
        videoUrl: "1042756114",
        credits: {
          realisationProduction: {
            realisation: ["Clair Obscur"],
            producteur: ["xxxxxx"]
          },
          imageSon: {
            dop: ["xxxxxx"],
            cameras: ["xxxxxx", "xxxxxx", "xxxxxx"],
            son: ["xxxxxx"]
          },
          postProduction: {
            montage: ["xxxxxx", "xxxxxx"],
            etalonnage: ["xxxxxx"],
            vfx: ["xxxxxx", "xxxxxx"]
          }
        },
        keyImages: [
          "/images/projects/la_grande_echappee/moluki2.webp",
          "/images/projects/la_grande_echappee/moluki1.webp",
          "/images/projects/la_grande_echappee/img7.webp",
          "/images/projects/la_grande_echappee/img4.webp",
          "/images/projects/la_grande_echappee/img8.webp",
          "/images/projects/la_grande_echappee/img6.webp",
          "/images/projects/la_grande_echappee/img11.webp",
          "/images/projects/la_grande_echappee/img5.webp",
        ],
      },
      {
        name: "Aux couleurs des tableaux",
        brand: "Clair Obscur",
        date: "2025",
        imagePreview: "/images/projects/aux_couleurs_des_tableaux/imgAuxCouleurs1.webp",
        preview: "/videos/preview/AuxCouleursPreviewCompressed.mp4",
        previewWebm: "/videos/preview/AuxCouleursPreview.webm",
        
        description: `Parce que la vie est faite de moments de lumières et
                d’obscurités, Clair Obscur est née aujourd’hui. Avec une volonté
                forte, celle de capturer et retransmettre à travers l’image le
                prisme infini de toutes ces émotions. "Aux couleurs des
                tableaux" est le film de lancement de l'agence Clair Obscur.`,
        projectUrl: "/aux-couleurs-des-tableaux",
        videoUrl: "1042756850",
        credits: {
          realisationProduction: {
            realisation: ["Clair Obscur"],
            producteur: ["xxxxxx"]
          },
          imageSon: {
            dop: ["xxxxxx"],
            cameras: ["xxxxxx", "xxxxxx", "xxxxxx"],
            son: ["xxxxxx"]
          },
          postProduction: {
            montage: ["xxxxxx", "xxxxxx"],
            etalonnage: ["xxxxxx"],
            vfx: ["xxxxxx", "xxxxxx"]
          }
        },
        keyImages: [
          "/images/projects/aux_couleurs_des_tableaux/img10.webp",
          "/images/projects/aux_couleurs_des_tableaux/img15.webp",
          "/images/projects/aux_couleurs_des_tableaux/img16.webp",
          "/images/projects/aux_couleurs_des_tableaux/img4.webp",
          "/images/projects/aux_couleurs_des_tableaux/img6.webp",
          "/images/projects/aux_couleurs_des_tableaux/img2.webp",
          "/images/projects/aux_couleurs_des_tableaux/img13.webp",
          "/images/projects/aux_couleurs_des_tableaux/img8.webp",
          "/images/projects/aux_couleurs_des_tableaux/img3.webp",
        ],
      },
    ],
  },
];

// Fonctions utilitaires avec typage
export const getProjectsByYear = (year: string): Project[] => {
  const yearData = projectsList.find(item => item.year === year);
  return yearData?.projects || [];
};

export const getAllProjects = (): Project[] => {
  return projectsList.flatMap(yearData => yearData.projects);
};

export const getProjectByName = (name: string): Project | undefined => {
  return getAllProjects().find(project => project.name === name);
};

export default projectsList;