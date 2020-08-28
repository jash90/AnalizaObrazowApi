import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards, 
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiImplicitParam,
    ApiOkResponse,
    ApiUseTags
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ImageDto } from "./dto/image.dto";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { ImageOffset } from "./dto/image.offset";
import { Image } from "./image.entity";
import { ImageService } from "./images.service";

@Controller("images")
@ApiUseTags("images")
export class ImageController {
    constructor(private readonly imagesService: ImageService) { }

    @Get()
    @ApiOkResponse({ type: [ImageDto] })
    findAll(): Promise<ImageDto[]> {
        return this.imagesService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: ImageDto })
    @ApiImplicitParam({ name: "id", required: true })
    findOne(@Param("id", new ParseIntPipe()) id: number): Promise<ImageDto> {
        return this.imagesService.findOne(id);
    }

    @Get("filename/:filename")
    @ApiOkResponse({ type: ImageDto })
    @ApiImplicitParam({ name: "filename", required: true })
    findByFilename(@Param("filename") filename: string): Promise<ImageDto> {
        return this.imagesService.findByFilename(filename);
    }

    @Post()
    @ApiCreatedResponse({ type: Image })
    create(@Body() createDto: CreateImageDto): Promise<Image> {
        return this.imagesService.create(createDto);
    }

    @Put(":id")
    @ApiOkResponse({ type: Image })
    @ApiImplicitParam({ name: "id", required: true })
    update(
        @Param("id", new ParseIntPipe()) id: number,
        @Body() UpdateDto: UpdateImageDto
    ): Promise<Image> {
        return this.imagesService.update(id, UpdateDto);
    }

    @Delete(":id")
    @ApiOkResponse({ type: Image })
    @ApiImplicitParam({ name: "id", required: true })
    delete(@Param("id", new ParseIntPipe()) id: number): Promise<Image> {
        return this.imagesService.delete(id);
    }

    @Get("offset/:id")
    @ApiOkResponse({ type: ImageOffset })
    offset(
        @Param("id", new ParseIntPipe()) index: number = 0
    ): Promise<ImageOffset> {
        return this.imagesService.offset(index);
    }
}
