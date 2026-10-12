// Content-addressed URLs refresh videos and posters when footage changes.
export const industryMedia: Record<string, {src: string; poster: string; context: string}> = {
  "mobility": {
    "context": "Vehicle cabin air",
    "src": "/videos/industries/vehicle-cabin-8323b51f22.mp4",
    "poster": "/videos/industries/vehicle-cabin-062e9f77ff.webp"
  },
  "manufacturing": {
    "context": "Food production",
    "src": "/videos/industries/food-production-2e299c4c3c.mp4",
    "poster": "/videos/industries/food-production-98ac19c6c2.webp"
  },
  "heavy-duty-industry": {
    "context": "Cement & process dust",
    "src": "/videos/industries/cement-plant-44a8754d64.mp4",
    "poster": "/videos/industries/cement-plant-7ef16666e1.webp"
  },
  "living": {
    "context": "Homes & indoor air",
    "src": "/videos/industries/family-at-home-cb1a6f48d9.mp4",
    "poster": "/videos/industries/family-at-home-e56a6388a3.webp"
  },
  "liquid": {
    "context": "Process water",
    "src": "/videos/industries/process-water-cc576dfacd.mp4",
    "poster": "/videos/industries/process-water-2f0b3de281.webp"
  }
};
