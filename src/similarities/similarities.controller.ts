import {
    Body,
    Controller,
    Get,
    Post,
} from "@nestjs/common";
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUseTags
} from "@nestjs/swagger";
import { CreateSimilarityDto } from "./dto/create-similarity.dto";
import { Similarity } from "./similarity.entity";
import { SimilarityService } from "./similarities.service";

@Controller("similarities")
@ApiUseTags("similarities")
export class SimilarityController {
    constructor(private readonly similaritiesService: SimilarityService) { }

    @Get()
    @ApiOkResponse({ type: [Similarity] })
    findAll(): Promise<Similarity[]> {
        return this.similaritiesService.findAll();
    }

    @Post()
    @ApiCreatedResponse({ type: Similarity })
    create(@Body() createDto: CreateSimilarityDto): Promise<Similarity> {
        return this.similaritiesService.create(createDto);
    }

}
