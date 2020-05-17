import { DatabaseModule } from "../database/database.module";
import { Module } from "@nestjs/common";
import { ImageController } from "./images.controller";
import { ImageService } from "./images.service";
import { imageProviders } from "./images.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [ImageController],
    providers: [ImageService, ...imageProviders],
    exports: []
})
export class ImageModule {}
