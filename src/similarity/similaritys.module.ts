import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { SimilarityController } from "./similaritys.controller";
import { SimilarityService } from "./similaritys.service";
import { similarityProviders } from "./similaritys.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [SimilarityController],
    providers: [SimilarityService, ...similarityProviders],
    exports: []
})
export class SimilarityModule {}
