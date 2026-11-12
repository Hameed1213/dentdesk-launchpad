/*
 * One entry per Solutions page: the photo used in its hero and on the /solutions hub.
 * Photos: Unsplash, free licence (IDs in the comments).
 */
export type SolutionPhoto = { src: string; alt: string; height: number; position: string };

export const solutionPhotos = {
  hub: {
    src: "/images/solutions/hub.webp",
    alt: "Dentist smiling at a patient in a bright surgery",
    height: 933,
    position: "object-[60%_40%]",
  }, // t5o3tjnaFMk
  noShows: {
    src: "/images/solutions/no-shows.webp",
    alt: "An empty dental chair in a clean, modern surgery",
    height: 933,
    position: "object-[50%_50%]",
  }, // Fdku_oMrDvk
  fillCancelled: {
    src: "/images/solutions/fill-cancelled.webp",
    alt: "Woman smiling as she takes a phone call at home",
    height: 788,
    position: "object-[40%_35%]",
  }, // 3KgSopqBgYI
  cutAdmin: {
    src: "/images/solutions/cut-admin.webp",
    alt: "Receptionist in a headset smiling at her computer",
    height: 934,
    position: "object-[70%_40%]",
  }, // wnpf3Q5pkXA
  deposits: {
    src: "/images/solutions/deposits.webp",
    alt: "Patient paying by card on a card reader",
    height: 933,
    position: "object-[45%_50%]",
  }, // z300lDNWM_M
  bringBack: {
    src: "/images/solutions/bring-back.webp",
    alt: "Smiling young patient back in the dental chair",
    height: 1750,
    position: "object-[50%_45%]",
  }, // UhVxAkKw8gQ
  private: {
    src: "/images/solutions/private.webp",
    alt: "Dentist talking with a patient in a private surgery",
    height: 1050,
    position: "object-[55%_45%]",
  }, // QA9fRIi6sFw
  goingPrivate: {
    src: "/images/solutions/going-private.webp",
    alt: "Smiling dental nurse in navy scrubs",
    height: 1980,
    position: "object-[50%_25%]",
  }, // _4xStiTXY1o
  newPractices: {
    src: "/images/solutions/new-practices.webp",
    alt: "A bright new practice waiting room",
    height: 1638,
    position: "object-[50%_60%]",
  }, // pxOQ-P97sA8
  multiSite: {
    src: "/images/solutions/multi-site.webp",
    alt: "A team of professionals standing together in an office",
    height: 788,
    position: "object-[50%_35%]",
  }, // q1jHh0MWTFk
} satisfies Record<string, SolutionPhoto>;
