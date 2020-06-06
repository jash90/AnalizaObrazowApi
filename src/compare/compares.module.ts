import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { CompareController } from "./compares.controller";
import { CompareService } from "./compares.service";
import { compareProviders } from "./compares.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [CompareController],
    providers: [CompareService, ...compareProviders],
    exports: []
})
export class CompareModule { }
