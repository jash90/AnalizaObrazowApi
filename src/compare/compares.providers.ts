import { Compare } from "./compare.entity";

export const compareProviders = [
    { provide: "ComparesRepository", useValue: Compare }
];
