import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiImplicitParam,
    ApiOkResponse,
    ApiUseTags
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { SimilarityDto } from "./dto/similarity.dto";
import { CreateSimilarityDto } from "./dto/create-similarity.dto";
import { UpdateSimilarityDto } from "./dto/update-similarity.dto";
import { SimilarityOffset } from "./dto/similarity.offset";
import { Similarity } from "./similarity.entity";
import { SimilarityService } from "./similaritys.service";

@Controller("similaritys")
@ApiUseTags("similaritys")
export class SimilarityController {
    constructor(private readonly similaritysService: SimilarityService) { }

    @Get()
    @ApiOkResponse({ type: [SimilarityDto] })
    findAll(): Promise<SimilarityDto[]> {
        return this.similaritysService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: SimilarityDto })
    @ApiImplicitParam({ name: "id", required: true })
    findOne(@Param("id", new ParseIntPipe()) id: number): Promise<SimilarityDto> {
        return this.similaritysService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: Similarity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    create(@Body() createDto: CreateSimilarityDto): Promise<Similarity> {
        return this.similaritysService.create(createDto);
    }

    @Put(":id")
    @ApiOkResponse({ type: Similarity })
    @ApiImplicitParam({ name: "id", required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    update(
        @Param("id", new ParseIntPipe()) id: number,
        @Body() UpdateDto: UpdateSimilarityDto
    ): Promise<Similarity> {
        return this.similaritysService.update(id, UpdateDto);
    }

    @Delete(":id")
    @ApiOkResponse({ type: Similarity })
    @ApiImplicitParam({ name: "id", required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    delete(@Param("id", new ParseIntPipe()) id: number): Promise<Similarity> {
        return this.similaritysService.delete(id);
    }

    @Get("offset/:id")
    @ApiOkResponse({ type: SimilarityOffset })
    offset(
        @Param("id", new ParseIntPipe()) index: number = 0
    ): Promise<SimilarityOffset> {
        return this.similaritysService.offset(index);
    }
}
