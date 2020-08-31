import { Similarity } from "./similarity.entity";

export const similarityProviders = [
    { provide: "similaritiesRepository", useValue: Similarity }
];
