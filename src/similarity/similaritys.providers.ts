import { Similarity } from "./similarity.entity";

export const similarityProviders = [
    { provide: "SimilaritysRepository", useValue: Similarity }
];
