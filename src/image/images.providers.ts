import { Image } from "./image.entity";

export const imageProviders = [
    { provide: "ImagesRepository", useValue: Image }
];
