import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { AlgorithmController } from "./algorithms.controller";
import { AlgorithmService } from "./algorithms.service";
import { algorithmProviders } from "./algorithms.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [AlgorithmController],
    providers: [AlgorithmService, ...algorithmProviders],
    exports: []
})
export class AlgorithmModule { }
