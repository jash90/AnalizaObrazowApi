import { Algorithm } from "./algorithm.entity";

export const algorithmProviders = [
    { provide: "AlgorithmsRepository", useValue: Algorithm }
];
