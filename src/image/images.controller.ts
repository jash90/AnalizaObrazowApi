import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from "@nestjs/common";
import {
    ApiCreatedResponse,
    ApiImplicitParam,
    ApiOkResponse,
    ApiUseTags
} from "@nestjs/swagger";
import { CreateImageDto } from "./dto/create-image.dto";
import { Image } from "./image.entity";
import { ImageService } from "./images.service";

@Controller("images")
@ApiUseTags("images")
export class ImageController {
    constructor(private readonly imagesService: ImageService) { }

    @Get()
    @ApiOkResponse({ type: [Image] })
    findAll(): Promise<Image[]> {
        return this.imagesService.findAll();
    }

    @Get("filename/:filename")
    @ApiOkResponse({ type: Image })
    @ApiImplicitParam({ name: "filename", required: true })
    findByFilename(@Param("filename") filename: string): Promise<Image> {
        return this.imagesService.findByFilename(filename);
    }

    @Post()
    @ApiCreatedResponse({ type: Image })
    create(@Body() createDto: CreateImageDto): Promise<Image> {
        return this.imagesService.create(createDto);
    }
}
