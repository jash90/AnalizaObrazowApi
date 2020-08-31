import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { SimilarityController } from "./similarities.controller";
import { SimilarityService } from "./similarities.service";
import { similarityProviders } from "./similarities.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [SimilarityController],
    providers: [SimilarityService, ...similarityProviders],
    exports: []
})
export class SimilarityModule { }
