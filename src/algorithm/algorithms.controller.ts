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
import { CreateAlgorithmDto } from "./dto/create-algorithm.dto";
import { Algorithm } from "./algorithm.entity";
import { AlgorithmService } from "./algorithms.service";

@Controller("algorithms")
@ApiUseTags("algorithms")
export class AlgorithmController {
    constructor(private readonly algorithmsService: AlgorithmService) { }

    @Get()
    @ApiOkResponse({ type: [Algorithm] })
    findAll(): Promise<Algorithm[]> {
        return this.algorithmsService.findAll();
    }

    @Post()
    @ApiCreatedResponse({ type: Algorithm })
    create(@Body() createDto: CreateAlgorithmDto): Promise<Algorithm> {
        return this.algorithmsService.create(createDto);
    }
}
