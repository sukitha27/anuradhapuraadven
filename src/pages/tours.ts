// Create this file at src/pages/tours.ts
export interface Tour {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  includes?: string[];
  excludes?: string[];
  bestTime?: string;
  price?: number;
}

const toursData: Tour[] = [
  {
    id: 1,
    slug: "anuradhapura-cultural-tour",
    title: "Anuradhapura Cultural Tour",
    description: "Explore the ancient capital of Sri Lanka with our guided cultural tour of sacred temples and historical sites.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    includes: ["Expert guide", "Entrance fees", "Transportation", "Lunch"],
    excludes: ["Personal expenses", "Gratuities"],
    bestTime: "November to April",
    price: 75
  },
  {
    id: 2,
    slug: "wilpattu-safari-adventure",
    title: "Wilpattu Safari Adventure",
    description: "Experience Sri Lanka's largest national park with a chance to spot leopards, elephants, and diverse wildlife.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e",
    includes: ["Park entrance fees", "Safari jeep", "Experienced tracker", "Refreshments"],
    excludes: ["Accommodation", "Meals not specified"],
    bestTime: "February to October",
    price: 95
  },
  {
    id: 3,
    slug: "anuradhapura-cycling-tour",
    title: "Anuradhapura Cycling Tour",
    description: "Discover the ancient city on two wheels with our guided cycling tour through historical pathways.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
    includes: ["Bicycle rental", "Helmet", "Guide", "Water bottle"],
    excludes: ["Meals", "Entrance fees to monuments"],
    bestTime: "Year-round (mornings recommended)",
    price: 45
  }
];

export default toursData;